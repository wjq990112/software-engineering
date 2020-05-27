/**
 * @file 列表组件
 * @author 炽翎
 */
import { createElement, memo, useContext } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import ListItem from '../ListItem';
import { Context } from '../../index';

import './index.css';

const List: Rax.FC = () => {
  const { state } = useContext(Context);
  const { myList } = state;

  const hasBorderSum = myList.length - 1;

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
              iconUrl={item.iconUrl}
              title={item.title}
              itemSum={item.itemSum}
            />
          );
        })}
      </View>
    </View>
  );
};

export default memo(List);
