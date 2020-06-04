/**
 * @file 分类组件
 * @author 炽翎
 */
import { createElement, memo, useContext } from 'rax';
import View from 'rax-view';
import { isWeex } from 'universal-env';

import ListItem from '../ListItem';
import Add from '../../../../components/Add';
import { Context } from '../../index';
import { constants } from '../../../store';
import { push } from '../../../../utils/tools';

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
        <Add onTouchEnd={switchRoute} />
      )}
    </View>
  );
};

export default memo(Class);
