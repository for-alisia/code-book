/** Models */
import { Cell } from '../../state';

/** Components */
import CodeCell from '../code-cell/code-cell.component';
import TextEditor from '../text-editor/text-editor.component';
import ActionBar from '../action-bar/action-bar.component';

/** Styles */
import './cell-list-item.styles.css';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return (
    <div className="cell-list-item">
      {cell.type === 'code' ? (
        <>
          <div className="action-bar-wrapper">
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>
      ) : (
        <>
          <TextEditor cell={cell} />
          <ActionBar id={cell.id} />
        </>
      )}
    </div>
  );
};

export default CellListItem;
