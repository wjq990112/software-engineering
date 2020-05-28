/**
 * @file State
 * @author 炽翎
 */
import { IListItemProps } from '../components/ListItem';

export interface IState {
  classList: Array<IListItemProps>;
  myList: Array<IListItemProps>;
}

const initState: IState = {
  classList: [],
  myList: []
};

export default initState;
