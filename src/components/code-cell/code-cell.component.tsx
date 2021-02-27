/** Dependencies */
import { useState, useEffect } from 'react';

/** ESBuild */
import bundle from '../../bundler';

/** Components */
import CodeEditor from '../code-editor/code-editor.component';
import Preview from '../preview/preview.component';
import Resizable from '../resizable/resizable.component';

/** Models */
import { Cell } from '../../state';

/** Redux */
import { useActions } from '../../hooks/use-actions.hook';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  /** Bundled code */
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundledCode = await bundle(cell.content);
      setCode(bundledCode.code);
      setError(bundledCode.err);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} bundleStatus={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
