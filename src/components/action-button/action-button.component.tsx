interface ActionBarProps {
  iconClass: string;
  onBtnClick: () => {};
}

const ActionButton: React.FC<ActionBarProps> = ({ iconClass, onBtnClick }) => {
  return (
    <button className="button is-primary is-small" onClick={onBtnClick}>
      <span className="icon">
        <i className={`fas ${iconClass}`}></i>
      </span>
    </button>
  );
};

export default ActionButton;
