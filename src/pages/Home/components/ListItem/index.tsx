/**
 * @file 列表项组件
 * @author 炽翎
 */
import { createElement, memo, useRef, useState } from 'rax';
import View from 'rax-view';
import Icon from 'rax-icon';
import Text from 'rax-text';
import classnames from 'classnames';
import findDOMNode from 'rax-find-dom-node';
import transition from 'universal-transition';

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
  itemSum: number;
  onTouchStart?: (e: Rax.TouchEvent) => void;
  onTouchMove?: (e: Rax.TouchEvent) => void;
  onTouchEnd?: (e: Rax.TouchEvent) => void;
}

const ListItem: Rax.FC<IListItemProps> = (props) => {
  const ref = useRef(null);

  const [isFocus, setIsFocus] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const {
    style,
    type,
    iconUrl,
    title,
    itemSum,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  } = props;

  const handleBoxTouchStart = (e: Rax.TouchEvent) => {
    onTouchStart(e);
    const { clientX: startX, clientY: startY } = e.touches[0];
    setStart({ x: startX, y: startY });
    setIsFocus(true);
  };

  const handleBoxTouchMove = (e: Rax.TouchEvent) => {
    onTouchMove(e);
    let timer = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      const { clientX: endX, clientY: endY } = e.touches[0];
      const [offsetX, offsetY] = [endX - start.x, endY - start.y];
      const itemLeftPosition =
        findDOMNode(ref.current).style.transform.split(
          /translateX\(|vw\)/g
        )[1] * 7.5 || 0;
      if (Math.abs(offsetX) < Math.abs(offsetY)) {
        console.log('纵向移动');
      } else if (Math.abs(offsetX) > 10 && Math.abs(offsetX) < 150) {
        transition(findDOMNode(ref.current), {
          transform: `translateX(${offsetX}rpx)`
        });
      }
      // TODO: 修改计算方式
      if (Math.abs(itemLeftPosition) - Math.abs(offsetX) < 50) {
        console.log('快接近左侧边缘');
      }
    }, 200);
  };

  const handleBoxTouchEnd = (e: Rax.TouchEvent) => {
    onTouchEnd(e);
    setIsFocus(false);
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
      ref={ref}
      className={listItemClass}
      style={style}
      onTouchStart={handleBoxTouchStart}
      onTouchMove={type === 'default' ? handleBoxTouchMove : () => {}}
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
  style: {},
  type: 'default',
  onTouchStart: () => {},
  onTouchMove: () => {},
  onTouchEnd: () => {}
};

export default memo(ListItem);
