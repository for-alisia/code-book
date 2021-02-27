/** Redux */
import { useActions } from '../../hooks/use-actions.hook';

/** Components */
import ActionButton from '../action-button/action-button.component';

/** Styles */
import './action-bar.styles.css';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <ActionButton iconClass="fa-arrow-up" onBtnClick={() => moveCell(id, 'up')} />
      <ActionButton iconClass="fa-arrow-down" onBtnClick={() => moveCell(id, 'down')} />
      <ActionButton iconClass="fa-times" onBtnClick={() => deleteCell(id)} />
    </div>
  );
};

export default ActionBar;
