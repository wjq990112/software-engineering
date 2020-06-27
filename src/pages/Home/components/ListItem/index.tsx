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
import { isWeex } from 'universal-env';

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
  color: string;
  iconUrl: string;
  title: string;
  itemSum: number;
  onTouchStart?: (e: Rax.TouchEvent) => void;
  onTouchEnd?: (e: Rax.TouchEvent) => void;
  onDelete?: (id: number) => void;
}

const ListItem: Rax.FC<IListItemProps> = (props) => {
  const ref = useRef(null);

  const [isFocus, setIsFocus] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [timer, setTimer] = useState(null);

  const {
    style,
    type,
    id,
    color,
    iconUrl,
    title,
    itemSum,
    onTouchStart,
    onTouchEnd,
    onDelete
  } = props;

  const swipe = () => {
    const position = deleting ? 0 : -150;
    const element = findDOMNode(ref.current);
    transition(
      element,
      {
        transform: `translateX(${position}rpx)`
      },
      { duration: 200, timingFunction: 'ease-in-out' }
    );
    const timer = setTimeout(() => {
      setDeleting(!deleting);
      clearTimeout(timer);
    }, 200);
  };

  const handleHorizontalPan = (e: PanEvent) => {
    // Weex 环境下无法获取 delta
    const { state, changedTouches } = e || {};
    if (isWeex) {
      if (type === 'default' && state === 'end') {
        swipe();
      }
    } else {
      if (type === 'default' && state === 'end') {
        const deltaX = changedTouches[0].deltaX;
        // 判断左右划动
        if (!deleting && deltaX < 0) {
          swipe();
        }
        if (deleting && deltaX > 0) {
          swipe();
        }
      }
    }
  };

  const handleBoxTouchStart = (e: Rax.TouchEvent) => {
    onTouchStart(e);
    if (type === 'box') {
      const timer = setTimeout(() => {
        setDeleting(!deleting);
        setIsFocus(false);
      }, 500);
      setTimer(timer);
    }
    setIsFocus(true);
  };

  const handleBoxTouchEnd = (e: Rax.TouchEvent) => {
    onTouchEnd(e);
    clearTimeout(timer);
    setIsFocus(false);
  };

  const remove = () => {
    const element = findDOMNode(ref.current);
    transition(
      element,
      {
        transform: 'translateX(900rpx)'
      },
      { duration: 200, timingFunction: 'ease-in-out' }
    );
    const timer = setTimeout(() => {
      setDeleting(!deleting);
      clearTimeout(timer);
    }, 200);
  };

  const handleDeleteBtnClick = (e: Rax.TouchEvent) => {
    remove();
    const timer = setTimeout(() => {
      onDelete(id);
      clearTimeout(timer);
    }, 200);
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
  const listItemDeleting = classnames({
    'list-item-deleting': type === 'default',
    'list-item-box-deleting': type === 'box'
  });
  const listItemDeletingContent = classnames({
    'list-item-deleting-content': type === 'default',
    'list-item-box-deleting-content': type === 'box'
  });

  return (
    <GestureView
      onHorizontalPan={type === 'default' ? handleHorizontalPan : () => {}}
    >
      <View
        ref={ref}
        style={{
          flexDirection: 'row',
          width: type === 'default' ? '925rpx' : 'auto',
          ...style
        }}
        onTouchStart={handleBoxTouchStart}
        onTouchEnd={handleBoxTouchEnd}
      >
        <View className={listItemClass}>
          <Icon
            source={{
              uri: iconUrl
            }}
            className={listItemIconClass}
            style={{
              backgroundColor: color
            }}
          />
          <Text className={listItemTitleClass}>{title}</Text>
          <Text className={listItemItemSumClass}>{itemSum}</Text>
        </View>
        {deleting || type === 'default' ? (
          <View className={listItemDeleting} onTouchEnd={handleDeleteBtnClick}>
            <Text className={listItemDeletingContent}>删除</Text>
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
  onTouchEnd: () => {},
  onDelete: () => {}
};

export default memo(ListItem);
