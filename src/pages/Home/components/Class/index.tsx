/**
 * @file 分类组件
 * @author 炽翎
 */
import { createElement, memo, useContext } from 'rax';
import View from 'rax-view';

import ListItem from '../ListItem';
import { Context } from '../../index';

import './index.css';

const Class: Rax.FC = () => {
  const { state } = useContext(Context);
  const { classList } = state;

  return (
    <View className="class">
      {classList.map((item) => (
        <ListItem
          key={item.title}
          type="box"
          iconUrl={item.iconUrl}
          title={item.title}
          itemSum={item.itemSum}
        />
      ))}
    </View>
  );
};

export default memo(Class);
