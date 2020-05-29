/**
 * @file 分类组件
 * @author 炽翎
 */
import { createElement, memo, useState, useContext } from 'rax';
import View from 'rax-view';

import ListItem from '../ListItem';
import { Context } from '../../index';
import { constants } from '../../store';

import './index.css';

const Class: Rax.FC = () => {
  const { state, dispatch } = useContext(Context);
  const { classList } = state;

  const onItemDelete = (id: number) => {
    dispatch({
      type: constants.DELETE_CLASS_ITEM,
      data: id
    });
  };

  return (
    <View className="class">
      {classList.length ? (
        classList.map((item) => (
          <ListItem
            key={item.id}
            type="box"
            id={item.id}
            iconUrl={item.iconUrl}
            title={item.title}
            itemSum={item.itemSum}
            onDelete={onItemDelete}
          />
        ))
      ) : (
        <View className="class-placeholder">
          <View className="class-placeholder-row"></View>
          <View className="class-placeholder-col"></View>
        </View>
      )}
    </View>
  );
};

export default memo(Class);
