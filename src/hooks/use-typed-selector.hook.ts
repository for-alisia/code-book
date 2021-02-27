/** Dependencies */
import { useSelector, TypedUseSelectorHook } from 'react-redux';

/** Redux */
import { RootState } from '../state';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
