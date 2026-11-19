import { readFile } from 'node:fs/promises';
import { extractiveAnswer, normalize } from '../docs/search.js';
import { modelAnswer } from '../rag.ts';
import type { Language } from '../rag.ts';

type Case = { id: string; language: Language; question: string; sources: string[]; facts: string[][] };
const cases: Case[] = JSON.parse(await readFile(new URL('./cases.json', import.meta.url), 'utf8'));
const useModel = process.argv.includes('--model');
const rows = [];
for (const item of cases) {
  const start = performance.now();
  const answer = useModel ? await modelAnswer(item.question, item.language) : extractiveAnswer(item.question, item.language);
  const sources = [...new Set(answer.blocks.flatMap(block => block.sources))].sort();
  const expected = [...item.sources].sort();
  const text = ` ${normalize(answer.blocks.map(block => block.text).join(' '))} `;
  const citations = sources.join(',') === expected.join(',');
  const content = item.facts.every(options =>
    options.some(phrase => text.includes(` ${normalize(phrase)} `)));
  rows.push({
    id: item.id,
    expected: expected.join(',') || 'abstain',
    actual: sources.join(',') || 'abstain',
    citations,
    content: !!sources.length === !!expected.length && content,
    ms: Math.round(performance.now() - start),
  });
}

console.table(rows);
const count = (check: (row: (typeof rows)[number]) => boolean) => rows.filter(check).length;
const unknown = rows.filter(row => row.expected === 'abstain').length;
console.log(`Mode: ${useModel ? 'local model' : 'guide excerpts'}`);
console.log(`Expected content or abstention: ${count(row => row.content)}/${rows.length}`);
console.log(`Exact citation sets: ${count(row => row.citations)}/${rows.length}`);
console.log(`Both checks: ${count(row => row.content && row.citations)}/${rows.length}`);
console.log(`Correct abstentions: ${count(row => row.expected === 'abstain' && row.actual === 'abstain')}/${unknown}`);
const latency = rows.map(row => row.ms).sort((a, b) => a - b);
console.log(`Latency p50/p95 in this run: ${latency[Math.ceil(latency.length * .5) - 1]}/${latency[Math.ceil(latency.length * .95) - 1]} ms`);
