/**
 * @file State
 * @author 炽翎
 */
import { IListItemProps } from '../components/ListItem';

export interface IState {
  classDeleting: boolean;
  listDeleting: boolean;
  classList: Array<IListItemProps>;
  myList: Array<IListItemProps>;
}

const initState: IState = {
  classDeleting: false,
  listDeleting: false,
  classList: [],
  myList: []
};

export default initState;
