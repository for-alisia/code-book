/** Dependencies */
import { Fragment, useEffect } from 'react';
/** Redux */
import { useTypedSelector } from '../../hooks/use-typed-selector.hook';
import { useActions } from '../../hooks/use-actions.hook';
/** Components */
import CellListItem from '../cell-list-item/cell-list-item.component';
import AddCell from '../add-cell/add-cell.component';

/** Styles */
import './cell-list.styles.css';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { data, order } }) => order.map((id) => data[id]));
  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, [fetchCells]);

  return (
    <div className="cell-list">
      <AddCell prevCellId={null} />
      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell prevCellId={cell.id} />
        </Fragment>
      ))}
    </div>
  );
};

export default CellList;
