import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'code' | 'text';
}

const defaultText = `
  # Code-Book: JS Code Snippets Editor
  ### Create documentation for your projects
  ---
  - Import NPM packages for JS and CSS
  - All cells have the common namespace (no need to import packages twice)
  - Bundle and transpile code inside browser
  - Save snippets in a file
  - Format code with Prettier (Format button in Code Cell)
  ---
  
  1. Choose +Code to create Code Cell (Code Editor) or +Text to create Text Cell (MD Editor)
  2. Use show() function to display variable in a preview area (see an example below)
  3. Saving and compiling are happenning on document's changes. Your file will always up to date.
  4. React and ReactDOM are already imported into the whole project. No need to import them.
  5. Preview area has a div#root element you can target.

  ---

  [Visit GitHub Repo](https://github.com/for-alisia/code-book)
`;
const defaultCode = `
  // Code Cell Example
  const App = () => (
    <div>
      <h1>React Component</h1>
      <p>Use show() function to display the component</p>
    </div>
  );
  show(<App />)
`;

const defaultCells: Cell[] = [
  { id: '1df', content: defaultText, type: 'text' },
  { id: '2dfc', content: defaultCode, type: 'code' },
];

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (_, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      console.log(fullPath);

      res.send(JSON.parse(result));
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(fullPath, JSON.stringify(defaultCells), 'utf-8');
        res.send(defaultCells);
      } else {
        throw err;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
    res.send({ status: 'OK' });
  });

  return router;
};
