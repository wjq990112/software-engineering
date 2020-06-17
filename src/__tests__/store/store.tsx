import { useReducer } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import {
  state as initState,
  reducer,
  constants
} from '../../pages/store/index';
import { IState } from '../../pages/store/state';
import { IListItemProps } from '../../pages/Home/components/ListItem';

const useTest = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return {
    state,
    dispatch
  };
};

describe('Test Store', () => {
  // 测试 initState
  it('Test initState', () => {
    const { result } = renderHook(() => useTest());
    expect(result.current.state).toEqual(initState);
  });

  // 测试 constants.GET_CLASS_LIST & constants.DELETE_CLASS_ITEM
  it('Test GET_CLASS_LIST & DELETE_CLASS_ITEM', () => {
    // GET_CLASS_LIST
    const { result } = renderHook(() => useTest());
    const newClassList: Array<IListItemProps> = [
      { id: 1, iconUrl: '', title: 'Test', itemSum: 0 }
    ];
    const newState: IState = {
      ...result.current.state,
      classList: newClassList
    };
    act(() => {
      result.current.dispatch({
        type: constants.GET_CLASS_LIST,
        data: newClassList
      });
    });
    expect(result.current.state).toEqual(newState);

    // DELETE_CLASS_ITEM
    act(() => {
      result.current.dispatch({
        type: constants.DELETE_CLASS_ITEM,
        data: 1
      });
    });
    expect(result.current.state).toEqual(initState);
  });

  // 测试 constants.GET_MY_LIST & constants.DELETE_MY_ITEM
  it('Test GET_MY_LIST & DELETE_MY_ITEM', () => {
    // GET_MY_LIST
    const { result } = renderHook(() => useTest());
    const newMyList: Array<IListItemProps> = [
      { id: 1, iconUrl: '', title: 'Test', itemSum: 0 }
    ];
    const newState: IState = { ...result.current.state, myList: newMyList };
    act(() => {
      result.current.dispatch({
        type: constants.GET_MY_LIST,
        data: newMyList
      });
    });
    expect(result.current.state).toEqual(newState);

    // DELETE_MY_ITEM
    act(() => {
      result.current.dispatch({
        type: constants.DELETE_MY_ITEM,
        data: 1
      });
    });
    expect(result.current.state).toEqual(initState);
  });

  it('Test Default', () => {
    const { result } = renderHook(() => useTest());
    act(() => {
      result.current.dispatch({
        type: 'DEFAULT',
        data: 'DEFAULT'
      });
    });
    expect(result.current.state).toEqual(initState);
  });
});
