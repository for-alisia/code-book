/** Dependencies */
import { useEffect } from 'react';

/** Components */
import CodeEditor from '../code-editor/code-editor.component';
import Preview from '../preview/preview.component';
import Resizable from '../resizable/resizable.component';

/** Models */
import { Cell } from '../../state';

/** Redux */
import { useActions } from '../../hooks/use-actions.hook';
import { useTypedSelector } from '../../hooks/use-typed-selector.hook';
import { useCumulativeCode } from '../../hooks/use-cumulative-code.hook';

/** Styles */
import './code-cell.styles.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell: { content, id } }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[id]);
  const cumulativeCode = useCumulativeCode(id);

  useEffect(() => {
    if (!bundle) {
      createBundle(id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(id, cumulativeCode);
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor initialValue={content} onChange={(value) => updateCell(id, value)} />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} bundleStatus={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
