/**
 * @file State
 * @author 炽翎
 */
import { IListItemProps } from '../components/ListItem';

export interface IListItem extends IListItemProps {
  id: number;
}
export interface IState {
  classList: Array<IListItem>;
  myList: Array<IListItem>;
}

const initState: IState = {
  classList: [],
  myList: []
};

export default initState;
