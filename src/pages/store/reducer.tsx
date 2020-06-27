/**
 * @file Reducer
 * @author 炽翎
 */
import { IState } from './state';
import * as constants from './constants';

export interface IAction {
  type: string;
  data?: any;
}

const reducer = (state: IState, action: IAction) => {
  const { type, data } = action;

  switch (type) {
    case constants.GET_CLASS_LIST: {
      const newState: IState = { ...state, classList: data };
      return newState;
    }
    case constants.GET_MY_LIST: {
      const newState: IState = { ...state, myList: data };
      return newState;
    }
    case constants.DELETE_CLASS_ITEM: {
      const newClassList = state.classList.filter((item) => item.id !== data);
      const newState: IState = { ...state, classList: newClassList };
      return newState;
    }
    case constants.DELETE_MY_ITEM: {
      const newMyList = state.myList.filter((item) => item.id !== data);
      const newState: IState = { ...state, myList: newMyList };
      return newState;
    }
    case constants.CHANGE_MODAL_VISIBLE: {
      const newState: IState = { ...state, modalVisible: !state.modalVisible };
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
