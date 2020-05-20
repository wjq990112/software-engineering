/**
 * @file 分类组件
 * @author 炽翎
 */
import { createElement, useEffect } from 'rax';
import View from 'rax-view';

import ListItem, { IListItemProps } from '../ListItem';

import './index.css';

/**
 * @interface list: 分类列表
 */
interface IClassProps {
  list?: Array<IListItemProps>;
}

const Class: Rax.FC<IClassProps> = (props) => {
  const { list } = props;

  return (
    <View className="class">
      {list.map((item) => (
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

Class.defaultProps = {
  list: []
};

export default Class;
