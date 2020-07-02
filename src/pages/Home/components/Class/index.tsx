/**
 * @file 分类组件
 * @author 炽翎
 */
import { createElement, memo, useContext } from 'rax';
import View from 'rax-view';

import ListItem from '../ListItem';
import Add from '../../../../components/Add';
import { Context } from '../../index';
import { constants } from '../../../store';
import { GET } from '../../../../utils/request';
import { AsObject } from 'universal-request/lib/types';

import './index.css';

const Class: Rax.FC = () => {
  const { state, dispatch } = useContext(Context);
  const { classList } = state;

  const onItemDelete = (id: number) => {
    dispatch({
      type: constants.DELETE_CLASS_ITEM,
      data: id
    });
    const url: string = '/deleteClass';
    const params: AsObject = {
      id
    };
    GET({ url, params })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeModalVisible = () => {
    dispatch({
      type: constants.CHANGE_MODAL_VISIBLE
    });
  };

  return (
    <View className="class">
      {classList.map((item) => (
        <ListItem
          key={item.id}
          type="box"
          id={item.id}
          color={item.color}
          iconUrl={item.iconUrl}
          title={item.title}
          itemSum={item.itemSum}
          onDelete={onItemDelete}
        />
      ))}
      <Add onTouchEnd={changeModalVisible} />
    </View>
  );
};

export default memo(Class);
