/** Dependencies */
import { useState } from 'react';

/** ESBuild */
import bundle from '../../bundler';

/** Components */
import CodeEditor from '../code-editor/code-editor.component';
import Preview from '../preview/preview.component';
import Resizable from '../resizable/resizable.component';

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
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue="const a = 1;" onChange={(value) => setRawCode(value)} />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
