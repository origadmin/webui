# OrigAdmin Panel

## Tech stack

This project implements the front-end Admin design based on the following technologies:

- ShadcnUI
- RSBuild
- Tailwind
- Postcss
- Prettier
- Bun
- TypeScript
- ESLint

## Instructions for getting started with the basics

### How it works

1. Make sure it's installed on your machine: [Bun](https://bun.sh/)。
2. Clone the project to the local computer：
   ```bash
   git clone https://github.com/origadmin/shadcn-admin-design
   ```
3. Go to the project directory：
   ```bash
   cd shadcn-admin-design
   ```
4. Install dependencies：
   ```bash
   bun install
   ```
5. Start the project：
   ```bash
   bun dev
   ```

### Script used

```
    "start": "bun run dev",
    "dev": "bun tailwind:dev && rsbuild dev --open",
    "dev:web": "bun tailwind:min && rsbuild dev --open",
    "build": "bun tailwind && rsbuild build",
    "preview": "bun tailwind:min && rsbuild build && rsbuild preview",
    "rsbuild": "bun run build",
    "tailwind": "bun tailwind:min",
    "tailwind:dev": "bunx tailwindcss --postcss -i ./src/styles/globals.css -o public/index.css",
    "tailwind:min": "bunx tailwindcss --postcss -i ./src/styles/globals.css -o public/index.css --minify",
    "shadcn": "bun x --bun shadcn@latest",
    "style:all": "bun lint && bun stylelint && bun format",
    "format": "prettier --write .",
    "format:check": "prettier -c -w .",
    "lint": "eslint .",
    "lint:fix": "eslint ./src --fix && bun format",
    "lint:strict": "eslint --max-warnings=0 ./src",
    "style": "stylelint ./src/**/*.{css}"
```    

- Build the project

```
bun run build
# or
bun rsbuild
```

- Add ShadcnUI Component

```
bun shadcn add xxx
```

- Format the file

```
bun format
```

- Lint the file

```
bun lint
```

### Project features:

- **High Performance**: Use Bun as a build tool to provide a fast build and hot reload experience.
- **Responsive Design**: Based on Tailwind CSS, it ensures a good user experience on a wide range of devices.
- **Scalability**: The project is clearly structured and easy to scale and maintain.
- **Modern Development**: Use TypeScript and ESLint to improve code quality and development efficiency.

## Project Description

- This project does not use Node-based backend technologies such as Next.js, Express, Nest.js and so on.
- This project does not use other build tools such as Vite.
- This project is intended to be used with the OriginAdmin backend.
- This project is designed to be used as a template for other projects.

### License

This project is licensed under [MIT License](https://opensource.org/licenses/MIT). Feel free to use and modify it, but
please
keep the original author information.

