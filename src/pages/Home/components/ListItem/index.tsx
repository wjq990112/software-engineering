/**
 * @file 列表项组件
 * @author 炽翎
 */
import { createElement, useState } from 'rax';
import View from 'rax-view';
import Icon from 'rax-icon';
import Text from 'rax-text';
import classnames from 'classnames';

import './index.css';

type ListItemType = 'default' | 'box';

/**
 * @interface iconUrl: icon 地址
 * @interface title: Item 标题
 * @interface itemSum: 事件总数
 */
export interface IListItemProps {
  style?: Rax.CSSProperties;
  type?: ListItemType;
  iconUrl: string;
  title: string;
  itemSum?: number;
  onClick?: (e: Rax.TouchEvent) => void;
}

const ListItem: Rax.FC<IListItemProps> = (props) => {
  const [isFocus, setIsFocus] = useState(false);

  const { style, type, iconUrl, title, itemSum, onClick } = props;

  const handleBoxTouchStart = (e: Rax.TouchEvent) => {
    setIsFocus(true);
  };
  const handleBoxTouchEnd = (e: Rax.TouchEvent) => {
    setIsFocus(false);
    onClick && onClick(e);
  };

  // 处理样式
  const listItemClass = classnames({
    'list-item': type === 'default',
    'list-item-focused': type === 'default' && isFocus,
    'list-item-box': type === 'box',
    'list-item-box-focused': type === 'box' && isFocus
  });
  const listItemIconClass = classnames({
    'list-item-icon': type === 'default',
    'list-item-icon-focused': type === 'default' && isFocus,
    'list-item-box-icon': type === 'box',
    'list-item-box-icon-focused': type === 'box' && isFocus
  });
  const listItemItemSumClass = classnames({
    'list-item-itemSum': type === 'default',
    'list-item-itemSum-focused': type === 'default' && isFocus,
    'list-item-box-itemSum': type === 'box',
    'list-item-box-itemSum-focused': type === 'box' && isFocus
  });
  const listItemTitleClass = classnames({
    'list-item-title': type === 'default',
    'list-item-title-focused': type === 'default' && isFocus,
    'list-item-box-title': type === 'box',
    'list-item-box-title-focused': type === 'box' && isFocus
  });

  return (
    <View
      className={listItemClass}
      style={style}
      onTouchStart={handleBoxTouchStart}
      onTouchEnd={handleBoxTouchEnd}
    >
      <Icon
        source={{
          uri: iconUrl
        }}
        className={listItemIconClass}
      />
      <Text className={listItemTitleClass}>{title}</Text>
      <Text className={listItemItemSumClass}>{itemSum}</Text>
    </View>
  );
};

ListItem.defaultProps = {
  type: 'default',
  itemSum: 0
};

export default ListItem;
