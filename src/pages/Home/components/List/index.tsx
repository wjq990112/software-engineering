/**
 * @file 列表组件
 * @author 炽翎
 */
import { createElement, memo, useContext } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import { isWeex } from 'universal-env';

import ListItem from '../ListItem';
import Add from '../../../../components/Add';
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

  const changeModalVisible = () => {
    dispatch({
      type: constants.CHANGE_MODAL_VISIBLE
    });
  };

  return (
    <View className="list">
      <Text className="list-title">我的列表</Text>
      <View className="list-wrapper">
        {myList.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            color={item.color}
            style={{
              borderBottomWidth: '1px',
              borderBottomColor: '#dcdcdc'
            }}
            iconUrl={item.iconUrl}
            title={item.title}
            itemSum={item.itemSum}
            onDelete={onItemDelete}
            onTouchEnd={switchRoute}
          />
        ))}
        <View className="list-item">
          <Add type="filled" onTouchEnd={changeModalVisible} />
        </View>
      </View>
    </View>
  );
};

export default memo(List);
