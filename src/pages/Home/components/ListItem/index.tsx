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
 * @interface title: Box 标题
 * @interface itemSum: 事件总数
 */
export interface ListItemProps {
  type?: ListItemType;
  iconUrl: string;
  title: string;
  itemSum?: number;
}

const ListItem: Rax.FC<ListItemProps> = (props) => {
  const [isFocus, setIsFocus] = useState(false);

  const { type, iconUrl, title, itemSum } = props;

  // 点击事件
  const handleBoxClick = () => {
    setIsFocus(true);
  };

  // 处理样式
  const listItemClass = classnames({
    'list-item': type === 'box',
    'list-item-focused': type === 'box' && isFocus
  });
  const listItemIconClass = classnames({
    'list-item-icon': type === 'box',
    'list-item-icon-focused': type === 'box' && isFocus
  });
  const listItemItemSumClass = classnames({
    'list-item-itemSum': type === 'box',
    'list-item-itemSum-focused': type === 'box' && isFocus
  });
  const listItemTitleClass = classnames({
    'list-item-title': type === 'box',
    'list-item-title-focused': type === 'box' && isFocus
  });

  return (
    <View className={listItemClass} onClick={handleBoxClick}>
      <Icon
        source={{
          uri: iconUrl
        }}
        className={listItemIconClass}
      />
      <Text className={listItemItemSumClass}>{itemSum}</Text>
      <Text className={listItemTitleClass}>{title}</Text>
    </View>
  );
};

ListItem.defaultProps = {
  type: 'default',
  itemSum: 0
};

export default ListItem;
