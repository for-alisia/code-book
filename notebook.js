[{"id":"1df","content":"\n  # Code-Book: JS Code Snippets Editor\n  ### Create documentation for your projects\n  ---\n  - Import NPM packages for JS and CSS\n  - All cells have the common namespace (no need to import packages twice)\n  - Bundle and transpile code inside browser\n  - Save snippets in a file\n  - Format code with Prettier (Format button in Code Cell)\n  ---\n  \n  1. Choose +Code to create Code Cell (Code Editor) or +Text to create Text Cell (MD Editor)\n  2. Use show() function to display variable in a preview area (see an example below)\n  3. Saving and compiling are happenning on document's changes. Your file will always up to date.\n  4. React and ReactDOM are already imported into the whole project. No need to import them.\n  5. Preview area has a div#root element you can target.\n\n  ---\n\n  [Visit GitHub Repo](https://github.com/for-alisia/code-book)\n","type":"text"},{"id":"2dfc","content":"\n  // Code Cell Example\n  const App = () => (\n    <div>\n      <h1>React Component</h1>\n      <p>Use show() function to display the component</p>\n    </div>\n  );\n  show(<App />)\n","type":"code"}]