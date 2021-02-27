/** Dependencies */
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

/** Redux */
import { actionCreators } from '../state';

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actionCreators, dispatch);
};
