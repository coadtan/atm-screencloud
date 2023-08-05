# ATM Simulator

This is a web application that simulates ATM machine. It is built with React and Typescript.

Quick Demo: [atm.coadtan.dev](https://atm.coadtan.dev/)

## Techs and Tools

- React (with [Vite](https://vitejs.dev/)) + Typescript for web
- State Management with [Zustand](https://github.com/pmndrs/zustand)
- [TanStack Router](https://tanstack.com/router/v1) for routing
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit testing
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged) for git hook (i.e. pre-commit)
  - Type-checking with [tsc-files](https://github.com/gustavopch/tsc-files)
  - Code formatting with [prettier](https://prettier.io/)
  - Ruled with [ESLint](https://eslint.org/)
- [Chakra UI](https://chakra-ui.com/) for some baked components and styling
- [TailwindCSS](https://tailwindcss.com/) for inline styling
- Icons from [tabler](https://tabler-icons.io/)

## Features

for the list of features and user guideline, please refer to [docs/Features.md](./docs/Features.md)

## Development

> Please install and setup Node before processing to the next step.
> If you have not done so, consider using [nvm](https://github.com/nvm-sh/nvm).

1. Cloned the repo then navigate to the project root directory and run

```bash
npm install
```

2. Start the dev server with

```bash
npm run dev
```

3. You should be able to access the web application on your favorite web-browser through the link below. Port 5173 could be used by some other application on your machine. So, feel free to change it to any available port.

```bash
http://127.0.0.1:5173/
```

### Development Notes

- This code base linting and formatting are ruled by prettier and eslint configurations.
- Git hooks
  - Each git commit will trigger a pre-commit hook that will run type-checking, linting, and formatting.
  - Each git push will trigger a pre-push hook that will run unit testing.
- For consistency
  - use Tailwind for all styling
  - use twMerge for merging and conditional Tailwind classes
- If you use VS Code. I have included some recommended extensions in `.vscode/extensions.json` and some workspace settings in `.vscode/settings.json`.

### Notable Project Structure

- `src` - source code
  - `components` - reusable components
  - `hooks` - custom hooks
  - `pages` - pages
  - `stores` - state management
  - `utils` - utility functions
- `.env` is added to git for convenience. Consider no sensitive information is stored in this file.
- `router.ts` is where all the page routes are defined.

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

## Deployment

This project is deployed on [Vercel](https://vercel.com/). The deployment is configured to be triggered on each push to the `main` branch.
