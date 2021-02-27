/** Models */
import { Cell } from '../../state';

/** Components */
import CodeCell from '../code-cell/code-cell.component';
import TextEditor from '../text-editor/text-editor.component';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return <div>{cell.type === 'code' ? <CodeCell cell={cell} /> : <TextEditor cell={cell} />}</div>;
};

export default CellListItem;
