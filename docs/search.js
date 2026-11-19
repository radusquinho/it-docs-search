import { guides } from './corpus.js';

export function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

export function lexicalSearch(question) {
  const query = ` ${normalize(question)} `;
  return guides.map(guide => ({
    guide,
    score: guide.terms.reduce((score, term) => score + (
      query.includes(` ${normalize(term)} `) ? normalize(term).split(' ').length : 0
    ), 0),
  })).filter(result => result.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3).map(result => result.guide);
}

export function extractiveAnswer(question, language) {
  const sources = lexicalSearch(question);
  return {
    mode: 'extractive',
    blocks: sources.map(({ id, [language]: source }) => ({
      text: source.steps.join('\n'),
      sources: [id],
    })),
  };
}
