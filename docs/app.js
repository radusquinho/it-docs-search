import { guides } from './corpus.js';
import { extractiveAnswer } from './search.js';

const copy = {
  en: {
    heading: ['Find an answer.', 'Check the source.'],
    subtitle: 'Search ten fictional IT guides in English or Spanish and see the documentation behind each answer.',
    question: 'Your question', placeholder: 'How do I restore a deleted file?', submit: 'Search',
    result: 'Answer', library: 'Source library', language: 'Language', close: 'Close',
    extractive: 'Guide excerpts', model: 'Local AI', modelLabel: 'Use local AI (Ollama)',
    initial: 'Ask a question or try an example above.',
    working: 'Looking through the guides…',
    empty: 'I don’t have enough information in the guides to answer that.',
    fallback: 'The local model was unavailable. Showing excerpts from the guides.',
    examples: ['How do I join the VPN and move my authenticator?', 'How long are deleted files kept in the backup?', 'Who approves travel expenses?'],
  },
  es: {
    heading: ['Encuentra la respuesta.', 'Comprueba la fuente.'],
    subtitle: 'Busca en diez guías ficticias de soporte IT en español o inglés y consulta la fuente de cada respuesta.',
    question: 'Tu pregunta', placeholder: '¿Cómo recupero un archivo borrado?', submit: 'Buscar',
    result: 'Respuesta', library: 'Guías de soporte', language: 'Idioma', close: 'Cerrar',
    extractive: 'Extractos de las guías', model: 'IA local', modelLabel: 'Usar IA local (Ollama)',
    initial: 'Haz una pregunta o prueba uno de los ejemplos.',
    working: 'Consultando las guías…',
    empty: 'Las guías no contienen información suficiente para responder.',
    fallback: 'El modelo local no está disponible. Se muestran extractos de las guías.',
    examples: ['¿Cómo me conecto a la VPN y cambio el autenticador de móvil?', '¿Cuánto tiempo se guarda un archivo borrado?', '¿Quién aprueba los gastos de viaje?'],
  },
};

const byId = id => document.getElementById(id);
const form = byId('ask-form');
const question = byId('question');
const result = byId('result');
const languageInput = byId('language');
const model = byId('use-model');
const dialog = byId('source-dialog');
const sourceById = new Map(guides.map(guide => [guide.id, guide]));
let language = navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
let activeRequest;
let lastQuestion = '';

function element(tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}

function showGuide(id) {
  const source = sourceById.get(id)?.[language];
  if (!source) return;
  byId('source-title').textContent = source.title;
  byId('source-group').textContent = source.group;
  byId('source-steps').replaceChildren(...source.steps.map(step => element('li', step)));
  dialog.showModal();
}

function guideButton(id, className) {
  const button = element('button', sourceById.get(id)[language].title, className);
  button.type = 'button';
  button.addEventListener('click', () => showGuide(id));
  return button;
}

function renderAnswer(answer, notice = '') {
  const text = copy[language];
  byId('mode-label').textContent = text[answer.mode];
  result.replaceChildren();
  if (notice) result.append(element('p', notice, 'notice'));
  if (!answer.blocks.length) result.append(element('p', text.empty, 'empty'));
  for (const block of answer.blocks) {
    const section = element('section', '', 'answer-block');
    if (answer.mode === 'extractive') {
      const steps = element('ol', '');
      steps.append(...block.text.split('\n').map(step => element('li', step)));
      section.append(steps);
    } else {
      section.append(element('p', block.text, 'model-text'));
    }
    const citations = element('div', '', 'citations');
    for (const id of new Set(block.sources)) citations.append(guideButton(id, 'citation'));
    section.append(citations);
    result.append(section);
  }
}

async function ask(value) {
  const cleaned = value.trim();
  if (!cleaned) return;
  lastQuestion = cleaned;
  activeRequest?.abort();
  const request = new AbortController();
  activeRequest = request;
  if (!model.checked) {
    renderAnswer(extractiveAnswer(cleaned, language));
    return;
  }
  byId('mode-label').textContent = copy[language].model;
  result.replaceChildren(element('p', copy[language].working, 'empty'));
  try {
    const response = await fetch('./api/ask', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: request.signal,
      body: JSON.stringify({ question: cleaned, language }),
    });
    if (!response.ok) throw new Error('Model unavailable');
    const answer = await response.json();
    if (activeRequest === request) renderAnswer(answer);
  } catch {
    if (activeRequest === request) renderAnswer(extractiveAnswer(cleaned, language), copy[language].fallback);
  }
}

function renderLocale() {
  const text = copy[language];
  document.documentElement.lang = language;
  languageInput.value = language;
  byId('heading').replaceChildren(text.heading[0], document.createElement('br'), text.heading[1]);
  for (const [id, value] of Object.entries({
    subtitle: text.subtitle, 'question-label': text.question, 'result-label': text.result,
    'library-label': text.library, 'language-label': text.language, 'model-label': text.modelLabel,
  })) byId(id).textContent = value;
  byId('submit').replaceChildren(text.submit + ' ', element('span', '→'));
  byId('submit').lastChild.setAttribute('aria-hidden', 'true');
  byId('close-source').setAttribute('aria-label', text.close);
  question.placeholder = text.placeholder;
  byId('examples').replaceChildren(...text.examples.map(example => {
    const button = element('button', example, 'example');
    button.addEventListener('click', () => {
      question.value = example;
      ask(example);
    });
    return button;
  }));
  byId('guide-list').replaceChildren(...guides.map(guide => {
    const row = element('li', '');
    row.append(guideButton(guide.id, 'guide-button'));
    return row;
  }));
  if (lastQuestion) {
    ask(lastQuestion);
  } else {
    byId('mode-label').textContent = text[model.checked ? 'model' : 'extractive'];
    result.replaceChildren(element('p', text.initial, 'empty'));
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  ask(question.value);
});
languageInput.addEventListener('change', () => {
  language = languageInput.value;
  renderLocale();
});
model.addEventListener('change', renderLocale);
renderLocale();

if (window.location.hostname === '127.0.0.1') {
  fetch('./api/status').then(response => response.ok ? response.json() : null).then(status => {
    if (status?.modelMode) byId('local-settings').hidden = false;
  }).catch(() => {});
}
