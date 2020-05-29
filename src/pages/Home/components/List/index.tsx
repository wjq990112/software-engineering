/**
 * @file 列表组件
 * @author 炽翎
 */
import { createElement, memo, useContext } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import { isWeex } from 'universal-env';

import ListItem from '../ListItem';
import { Context } from '../../index';
import { constants } from '../../../store';
import { push } from '../../../../utils/tools';

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

  const switchRoute = () => {
    push({
      url: `/${isWeex ? 'weex' : 'web'}/detail${isWeex ? '?wh_weex=true' : ''}`,
      animated: true
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
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
          <View className="list-placeholder" onTouchEnd={switchRoute}>
            <View className="list-placeholder-row"></View>
            <View className="list-placeholder-col"></View>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(List);
