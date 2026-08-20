# ArcDrill

Spaced-repetition flashcards for the **electrical code**. Drill NEC articles with the SuperMemo-2 algorithm, or paste a section and let Grok write the cards.

Educational reference only — not a substitute for the adopted edition of NFPA 70 or the authority having jurisdiction. Study questions are original exam-prep wording, not quoted Code text.

## Features

- **Seeded decks** — Articles **110**, **210**, **240**, **250**, and **310** (working space, branch circuits, overcurrent, grounding & bonding, conductors)
- **SM-2 scheduling** — Again / Hard / Good / Easy; failures reset; intervals grow with the easiness factor
- **Study session** — reveal answer, rate with keyboard shortcuts `1`–`4` or Space to flip
- **Generate** — paste an excerpt; Grok returns exam-style Q&A (or a local heuristic fallback without a key)
- **Local persistence** — decks, card state, and streak in `localStorage` (no server required for the core loop)

## Stack

React 19, TypeScript, Vite, Tailwind v4.

## Run

```bash
npm install
npm run dev
```

App listens on `0.0.0.0:8080`.

```bash
npm run typecheck
npm run build
```

### Optional: Grok card generation

Set a Vite env var so the Generate page calls the xAI API instead of the offline heuristic:

```bash
# .env.local (do not commit)
VITE_XAI_API_KEY=xai-...
```

Calls use model `grok-4.5` and are user-initiated only.

## Layout

| Path | What |
| --- | --- |
| `src/lib/sm2.ts` | Classic SuperMemo-2 |
| `src/lib/seed-data.ts` | Starter decks and demo cards |
| `src/lib/storage.ts` | localStorage store, due queue, review, generated decks |
| `src/components/Flashcard.tsx` | Reveal card |
| `src/components/GradeBar.tsx` | Again / Hard / Good / Easy |
| `src/App.tsx` | Home, study, decks, generate |

## License

Educational reference app. NFPA 70 text is not reproduced; confirm the adopted Code in your jurisdiction.
