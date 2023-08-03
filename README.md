# ATM simulator web application

Techs and Tools

- React (with Vite) + Typescript for web
- Vitest + React Testing Library for unit testing
- Husky + lint-staged for git hook (i.e. pre-commit)
  - Type-checking with **tsc-files**
  - Code formatting with **prettier**
  - Ruled with **ESLint**
- Chakra UI for some baked components and styling
- TailwindCSS for inline styling

## Development

> Please install and setup Node before processing to the next step.
> If you have not done so, consider using [nvm](https://github.com/nvm-sh/nvm).

1. Navigate to the project root directory and run the following command

```bash
npm install
```

2. Start the dev server with

```bash
npm run dev
```

3. You should be able to access the web application on your favorite web-browser through http://127.0.0.1:5173/

### Development Notes

- This code base linting and formatting are ruled by prettier and eslint configurations.
- For consistency, use Tailwind for all styling.

## Testing

This project uses Vitest for unit testing. In order to run unit tests, you can run the following command

```bash
npm run test
```

Or Vitest UI

```bash
npm run test:ui
```

For coverage

```bash
npm run test:coverage
```
