/**
 * @file 列表组件
 * @author 炽翎
 */
import { createElement, memo, useState, useContext } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import ListItem from '../ListItem';
import { Context } from '../../index';
import { constants } from '../../store';

import './index.css';

const List: Rax.FC = () => {
  const [timer, setTimer] = useState(null);
  const { state, dispatch } = useContext(Context);
  const { myList } = state;

  const hasBorderSum = myList.length - 1;

  const handleTouchStart = (e: Rax.TouchEvent) => {
    const timer = setTimeout(() => {
      dispatch({
        type: constants.HANDLE_LIST_LONG_PRESS
      });
    }, 500);
    setTimer(timer);
  };

  const handleTouchEnd = (e: Rax.TouchEvent) => {
    clearTimeout(timer);
    setTimer(null);
  };

  return (
    <View className="list">
      <Text className="list-title">我的列表</Text>
      <View className="list-wrapper">
        {myList.map((item, index) => {
          const hasBorder = index < hasBorderSum;
          const style = hasBorder && {
            borderBottomWidth: '1px',
            borderBottomColor: '#dcdcdc'
          };
          return (
            <ListItem
              key={item.title}
              style={style}
              deleting={state.listDeleting}
              iconUrl={item.iconUrl}
              title={item.title}
              itemSum={item.itemSum}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          );
        })}
      </View>
    </View>
  );
};

export default memo(List);
