# Business Plan Studio

A student enterprise tool: teams enter their names, take a group + personal quiz, get matched business ideas and team roles, write a 14-section guided business plan, and download it as a PDF. English, 中文, 한국어 and Русский.

```bash
npm install
npm run dev
```

- All wording is in `src/i18n/` (`en.js` is the master; other languages mirror its keys and fall back to English for anything missing).
- Quiz questions and scoring: `src/data/quiz.js`, `src/lib/scoring.js`. Business ideas: `src/data/ideas.js`. Plan sections and research links: `src/data/sections.js`.
- Brand colours: the `@theme` block in `src/index.css`.
- Work is saved only in the browser's local storage; there is no server or database.
