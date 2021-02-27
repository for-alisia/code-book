/** Dependencies */
import { Fragment } from 'react';
/** Redux */
import { useTypedSelector } from '../../hooks/use-typed-selector.hook';
/** Components */
import CellListItem from '../cell-list-item/cell-list-item.component';
import AddCell from '../add-cell/add-cell.component';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { data, order } }) => order.map((id) => data[id]));
  return (
    <div>
      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <AddCell nextCellId={cell.id} />
          <CellListItem cell={cell} />
        </Fragment>
      ))}
      <AddCell nextCellId={null} />
    </div>
  );
};

export default CellList;
