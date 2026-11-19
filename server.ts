import { createServer } from 'node:http';
import type { IncomingMessage } from 'node:http';
import { readFile } from 'node:fs/promises';
import { modelAnswer } from './rag.ts';

const port = Number(process.env.PORT || 4173);
const address = `127.0.0.1:${port}`;
const staticFiles = {
  '/': ['index.html', 'text/html'],
  '/app.js': ['app.js', 'text/javascript'],
  '/corpus.js': ['corpus.js', 'text/javascript'],
  '/search.js': ['search.js', 'text/javascript'],
  '/styles.css': ['styles.css', 'text/css'],
};

async function readJson(request: IncomingMessage) {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 8192) throw new Error('Body too large.');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

createServer(async (request, response) => {
  function json(status: number, data: object) {
    response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify(data));
  }
  if (request.headers.host !== address) return json(403, { error: 'Use the loopback URL shown in the terminal.' });
  const path = new URL(request.url || '/', `http://${address}`).pathname;
  if (request.method === 'GET' && path === '/api/status') return json(200, { modelMode: true });

  if (request.method === 'POST' && path === '/api/ask') {
    if (request.headers.origin && request.headers.origin !== `http://${address}`) return json(403, { error: 'Invalid origin.' });
    if (!request.headers['content-type']?.startsWith('application/json')) return json(415, { error: 'Expected JSON.' });
    try {
      const body = await readJson(request);
      if (typeof body?.question !== 'string' || !body.question.trim() || body.question.length > 350 ||
          (body.language !== 'es' && body.language !== 'en')) {
        return json(400, { error: 'Enter a question of up to 350 characters and select a supported language.' });
      }
      try {
        return json(200, await modelAnswer(body.question.trim(), body.language));
      } catch (error) {
        console.error(error);
        return json(503, { error: 'The local model is unavailable or its answer could not be validated.' });
      }
    } catch {
      return json(400, { error: 'Invalid request body.' });
    }
  }

  if (request.method !== 'GET' || !Object.hasOwn(staticFiles, path)) return json(404, { error: 'Not found.' });
  const [file, mime] = staticFiles[path as keyof typeof staticFiles];
  try {
    const content = await readFile(new URL(`./docs/${file}`, import.meta.url));
    response.writeHead(200, { 'Content-Type': `${mime}; charset=utf-8`, 'X-Content-Type-Options': 'nosniff' });
    response.end(content);
  } catch {
    json(500, { error: 'Could not read the application files.' });
  }
}).listen(port, '127.0.0.1', () => console.log(`IT Docs Search at http://${address}`));
