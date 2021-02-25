/** Dependencies */
import { useState, useEffect } from 'react';

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
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundledCode = await bundle(rawCode);
      setCode(bundledCode.code);
      setError(bundledCode.err);
    }, 1000);

    return () => clearTimeout(timer);
  }, [rawCode]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue="const a = 1;" onChange={(value) => setRawCode(value)} />
        </Resizable>
        <Preview code={code} bundleStatus={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
