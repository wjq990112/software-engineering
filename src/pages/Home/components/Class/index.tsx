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
  const [timer, setTimer] = useState(null);
  const { state, dispatch } = useContext(Context);
  const { classList } = state;

  const handleTouchStart = (e: Rax.TouchEvent) => {
    const timer = setTimeout(() => {
      dispatch({
        type: constants.HANDLE_BOX_LONG_PRESS
      });
    }, 500);
    setTimer(timer);
  };

  const handleTouchEnd = (e: Rax.TouchEvent) => {
    clearTimeout(timer);
    setTimer(null);
  };

  return (
    <View className="class">
      {classList.map((item) => (
        <View key={item.title}>
          <ListItem
            type="box"
            iconUrl={item.iconUrl}
            title={item.title}
            itemSum={item.itemSum}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
          {state.classDeleting ? (
            <View className="class-deleting">
              <View className="class-deleting-content"></View>
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
};

export default memo(Class);
