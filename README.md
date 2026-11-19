# IT Docs Search

A bilingual search app for ten fictional IT support guides. Each answer links to the source guide, and questions without supporting material can produce an explicit abstention.

**[Try the public demo](https://radusquinho.github.io/it-docs-search/)** · [Portfolio](https://radusquinho.com/)

The public demo uses keyword retrieval and displays excerpts from the guides. It runs in the browser without an account or an API key. The optional local mode combines multilingual embeddings and keyword retrieval, then uses a language model to write a cited answer. The interface labels the mode in use.

## Run locally

Requires Node.js 24 or later. The app has no npm dependencies.

```sh
npm start
```

Open [http://127.0.0.1:4173/](http://127.0.0.1:4173/). Guide excerpts work immediately. To enable model-generated answers, install [Ollama](https://ollama.com/download), start it and pull both models:

```sh
ollama pull bge-m3
ollama pull qwen2.5:3b
```

Select **Use local AI (Ollama)** in the app. Node serves the UI and calls the local Ollama APIs. Use the `EMBEDDING_MODEL` and `CHAT_MODEL` environment variables to select other compatible models. The local server listens on the loopback interface.

## How the local AI mode works

1. Index the guides in both languages on demand using Ollama embeddings.
2. Combine phrase matches with ranked semantic matches and pass up to three guides to the model.
3. Request structured answer blocks with source IDs. Check their shape and reject IDs outside the retrieved context before displaying them.

Citation validation checks which guide IDs are returned. Whether the cited text actually supports each claim is an evaluation question. The interface shows explicitly when it falls back to guide excerpts after a model error.

## Evaluation

```sh
npm run evaluate
npm run evaluate -- --model
```

The suite has 20 English and Spanish test questions, including cross-guide queries and questions with no documented answer. Each check compares the exact set of citation IDs and checks for the expected facts or abstention. The runner also prints latency percentiles for the current run.

Guide excerpts pass **18/20** on both checks and abstain correctly on **2/3** unsupported questions. A paraphrase about one-time codes misses the authenticator guide. A question about a 3D printer retrieves the office printer guide by keyword. The dataset is a small development fixture. Fact checks use phrase matching and can miss valid paraphrases.

## References

- [Ollama embeddings API](https://docs.ollama.com/api/embed)
- [Ollama structured outputs](https://docs.ollama.com/capabilities/structured-outputs)

MIT licensed.
