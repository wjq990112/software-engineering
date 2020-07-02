/**
 * @file 首页
 * @author 炽翎
 */
import { createElement, useEffect, createContext, useReducer } from 'rax';
import ScrollView from 'rax-scrollview';
import Modal from 'rax-modal';
import Text from 'rax-text';

import Class from './components/Class';
import List from './components/List';
import { GET } from '../../utils/request';
import { IState } from '../store/state';
import { IAction } from '../store/reducer';
import { IListItemProps } from './components/ListItem';
import { state as initState, reducer, constants } from '../store';

import './index.css';

interface IClassListResponseData {
  code: number;
  data: {
    classList: Array<IListItemProps>;
  };
  message: string;
}

interface IMyListResponseData {
  code: number;
  data: {
    myList: Array<IListItemProps>;
  };
  message: string;
}

interface IContext {
  state: IState;
  dispatch: Rax.Dispatch<IAction>;
}

const initContext: IContext = {
  state: initState,
  dispatch: (value: IAction) => {}
};

export const Context = createContext(initContext);

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initState);

  const getClassList = () => {
    const url: string = '/getClass';
    GET({ url })
      .then((res: IClassListResponseData) => {
        if (res.code === 200) {
          dispatch({
            type: constants.GET_CLASS_LIST,
            data: res.data.classList
          });
        } else {
          console.log(res.message);
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  const getMyList = () => {
    const url: string = '/getList';
    GET({ url })
      .then((res: IMyListResponseData) => {
        if (res.code === 200) {
          dispatch({
            type: constants.GET_MY_LIST,
            data: res.data.myList
          });
        } else {
          console.log(res.message);
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  const changeModalVisible = () => {
    dispatch({
      type: constants.CHANGE_MODAL_VISIBLE
    });
  };

  useEffect(() => {
    getClassList();
    getMyList();
  }, []);

  return (
    <ScrollView className="home">
      <Context.Provider value={{ state, dispatch }}>
        <Class />
        <List />
        <Modal visible={state.modalVisible} onHide={changeModalVisible}>
          <Text>test</Text>
        </Modal>
      </Context.Provider>
    </ScrollView>
  );
}
