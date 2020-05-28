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
  const [deleting, setDeleting] = useState(false);
  const [timer, setTimer] = useState(null);
  const { state, dispatch } = useContext(Context);
  const { classList } = state;

  const handleTouchStart = (e: Rax.TouchEvent) => {
    const timer = setTimeout(() => {
      setDeleting(!deleting);
    }, 500);
    setTimer(timer);
  };

  const handleTouchEnd = (e: Rax.TouchEvent) => {
    clearTimeout(timer);
    setTimer(null);
  };

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
          <View key={item.id}>
            <ListItem
              type="box"
              id={item.id}
              iconUrl={item.iconUrl}
              title={item.title}
              itemSum={item.itemSum}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
            {deleting ? (
              <View
                className="class-deleting"
                onClick={() => onItemDelete(item.id)}
              >
                <View className="class-deleting-content"></View>
              </View>
            ) : null}
          </View>
        ))
      ) : (
        <View>+</View>
      )}
    </View>
  );
};

export default memo(Class);
