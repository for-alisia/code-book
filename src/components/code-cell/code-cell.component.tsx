/** Dependencies */
import { useState } from 'react';

/** ESBuild */
import bundle from '../../bundler';

/** Components */
import CodeEditor from '../code-editor/code-editor.component';
import Preview from '../preview/preview.component';

const CodeCell: React.FC = () => {
  /** Code from monaco editor  */
  const [rawCode, setRawCode] = useState('');
  /** Bundled code */
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundle(rawCode);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor initialValue="const a = 1;" onChange={(value) => setRawCode(value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>

      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
