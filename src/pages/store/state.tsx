/**
 * @file State
 * @author 炽翎
 */
import { IListItemProps } from '../Home/components/ListItem';

export interface IState {
  classList: Array<IListItemProps>;
  myList: Array<IListItemProps>;
  modalVisible: boolean;
}

const initState: IState = {
  classList: [],
  myList: [],
  modalVisible: false
};

export default initState;
