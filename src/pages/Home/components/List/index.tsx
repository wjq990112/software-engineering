/**
 * @file 列表组件
 * @author 炽翎
 */
import { createElement, memo, useContext } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import ListItem from '../ListItem';
import { Context } from '../../index';
import { constants } from '../../store';

import './index.css';

const List: Rax.FC = () => {
  const { state, dispatch } = useContext(Context);
  const { myList } = state;

  const hasBorderSum = myList.length - 1;

  const onItemDelete = (id: number) => {
    dispatch({
      type: constants.DELETE_MY_ITEM,
      data: id
    });
  };

  return (
    <View className="list">
      <Text className="list-title">我的列表</Text>
      <View className="list-wrapper">
        {myList.length ? (
          myList.map((item, index) => {
            const hasBorder = index < hasBorderSum;
            const style = hasBorder && {
              borderBottomWidth: '1px',
              borderBottomColor: '#dcdcdc'
            };
            return (
              <ListItem
                key={item.id}
                id={item.id}
                style={style}
                iconUrl={item.iconUrl}
                title={item.title}
                itemSum={item.itemSum}
                onDelete={onItemDelete}
              />
            );
          })
        ) : (
          <View>+</View>
        )}
      </View>
    </View>
  );
};

export default memo(List);
