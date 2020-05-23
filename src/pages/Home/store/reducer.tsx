/**
 * @file Reducer
 * @author 炽翎
 */
import { IState } from './state';
import * as constants from './constants';
import { IListItemProps } from '../components/ListItem';

export interface IAction {
  type: string;
  data?: Array<IListItemProps>;
}

const reducer = (state: IState, action: IAction) => {
  const { type, data } = action;

  switch (type) {
    case constants.HANDLE_BOX_LONG_PRESS: {
      const newState: IState = {
        ...state,
        classDeleting: !state.classDeleting
      };
      return newState;
    }
    case constants.HANDLE_LIST_LONG_PRESS: {
      const newState: IState = { ...state, listDeleting: !state.listDeleting };
      return newState;
    }
    case constants.GET_CLASS_LIST: {
      const newState: IState = { ...state, classList: data };
      return newState;
    }
    case constants.GET_MY_LIST: {
      const newState: IState = { ...state, myList: data };
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
