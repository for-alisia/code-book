### CLI Code Snippets Redactor

- Uses [ESBuild](https://esbuild.github.io/) to transpile and bundle all the code directly in the browser
- Uses custom plugins for ESBuild (to get packages from [unpkg.com](https://unpkg.com/) and correctly bundle them inside the browser: one plugin changes the paths to the npm packages and another set the appropriate content)
- Uses Monaco Text Editor ([monaco-editor/react](https://www.npmjs.com/package/@monaco-editor/react))
- Uses [Prettier](https://www.npmjs.com/package/prettier) to format the user's code
- Uses [Markdown Editor](https://www.npmjs.com/package/@uiw/react-md-editor) to handle text snippets
- Uses [bulmaswatch/superhero theme](https://jenil.github.io/bulmaswatch/superhero/) for styling
