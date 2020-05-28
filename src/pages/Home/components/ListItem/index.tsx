/**
 * @file 列表项组件
 * @author 炽翎
 */
import { createElement, memo, useRef, useState } from 'rax';
import View from 'rax-view';
import Icon from 'rax-icon';
import Text from 'rax-text';
import classnames from 'classnames';
import GestureView from 'rax-gesture-view';
import findDOMNode from 'rax-find-dom-node';
import transition from 'universal-transition';
import { isWeb, isWeex } from 'universal-env';

import './index.css';
import { PanEvent } from 'rax-gesture-view/lib/types';

type ListItemType = 'default' | 'box';

/**
 * @interface iconUrl: icon 地址
 * @interface title: Item 标题
 * @interface itemSum: 事件总数
 */
export interface IListItemProps {
  style?: Rax.CSSProperties;
  type?: ListItemType;
  id: number;
  iconUrl: string;
  title: string;
  itemSum: number;
  onTouchStart?: (e: Rax.TouchEvent) => void;
  onTouchEnd?: (e: Rax.TouchEvent) => void;
}

const ListItem: Rax.FC<IListItemProps> = (props) => {
  const ref = useRef(null);

  const [isFocus, setIsFocus] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    style,
    type,
    iconUrl,
    title,
    itemSum,
    onTouchStart,
    onTouchEnd
  } = props;

  const swipe = () => {
    const position = deleting ? -150 : 0;
    transition(
      findDOMNode(ref.current),
      {
        transform: `translateX(${position}rpx)`
      },
      { duration: 200, timingFunction: 'ease-in-out' },
      () => {
        setDeleting(!deleting);
      }
    );
  };

  const handleHorizontalPan = (e: PanEvent) => {
    // Weex 环境下无法获取 delta
    const { state, changedTouches } = e || {};
    if (isWeb) {
      if (type === 'default' && state === 'end') {
        const deltaX = changedTouches[0].deltaX;
        // 判断左右划动
        if (deleting && deltaX < 0) {
          swipe();
        }
        if (!deleting && deltaX > 0) {
          swipe();
        }
      }
    }
    if (isWeex) {
      if (type === 'default' && state === 'end') {
        swipe();
      }
    }
  };

  const handleBoxTouchStart = (e: Rax.TouchEvent) => {
    onTouchStart(e);
    setIsFocus(true);
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
    <GestureView onHorizontalPan={handleHorizontalPan}>
      <View
        ref={ref}
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
        {type === 'default' && deleting ? (
          <View className="list-item-deleting" style={style}>
            <Text className="list-item-deleting-content">删除</Text>
          </View>
        ) : null}
      </View>
    </GestureView>
  );
};

ListItem.defaultProps = {
  style: {},
  type: 'default',
  onTouchStart: () => {},
  onTouchEnd: () => {}
};

export default memo(ListItem);
