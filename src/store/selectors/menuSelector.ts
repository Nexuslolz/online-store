import { RootState } from '../store';

export const getIsOpen = (state: RootState): boolean => {
  return state.menu.isOpen;
};
