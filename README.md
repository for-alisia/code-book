### JS Code Snippets Redactor (CLI)

![screen](/app.screen.png)

## Installation

To install and run application on your local computer:

```bash
npm install -g code-notebook
code-book serve
```

OR:

```bash
npx code-notebook serve
```

## Options

To specify output file, where notes will be saved. (notebook.js by default)

```bash
npx install code-notebook serve filename
```

To specify port where app starts (4005 by default)

```bash
npx install code-notebook serve --port 3300
```

## Features

- [ESBuild](https://esbuild.github.io/) to transpile and bundle all the code directly in the browser
- Custom plugins for ESBuild (to get packages from [unpkg.com](https://unpkg.com/) and correctly bundle them inside the browser: one plugin changes the paths to the npm packages and another set the appropriate content)
- Monaco Text Editor ([monaco-editor/react](https://www.npmjs.com/package/@monaco-editor/react))
- [Prettier](https://www.npmjs.com/package/prettier) to format the user's code
- [Markdown Editor](https://www.npmjs.com/package/@uiw/react-md-editor) to handle text snippets
- [bulmaswatch/superhero theme](https://jenil.github.io/bulmaswatch/superhero/) for styling
- State Managament: Redux, Immer, Thunk
- [Lerna](https://github.com/lerna/lerna) to handle all packages
