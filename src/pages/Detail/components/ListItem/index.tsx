/**
 * @file 列表项组件
 * @author 炽翎
 */
import { createElement, memo, useRef, useState } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import GestureView from 'rax-gesture-view';
import classnames from 'classnames';
import findDOMNode from 'rax-find-dom-node';
import transition from 'universal-transition';
import { isWeex } from 'universal-env';

import './index.css';
import { PanEvent } from 'rax-gesture-view/lib/types';

/**
 * @interface title: Item 标题
 */
export interface IListItemProps {
  style?: Rax.CSSProperties;
  id: number;
  title: string;
  onTouchStart?: (e: Rax.TouchEvent) => void;
  onTouchEnd?: (e: Rax.TouchEvent) => void;
  onDelete?: (id: number) => void;
}

const ListItem: Rax.FC<IListItemProps> = (props) => {
  const ref = useRef(null);

  const [deleting, setDeleting] = useState(false);
  const [checked, setChecked] = useState(false);

  const { style, id, title, onTouchStart, onTouchEnd, onDelete } = props;

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
    setTimeout;
    setDeleting(!deleting);
  };

  const handleHorizontalPan = (e: PanEvent) => {
    // Weex 环境下无法获取 delta
    const { state, changedTouches } = e || {};
    if (state === 'end') {
      if (isWeex) {
        swipe();
      } else {
        const deltaX = changedTouches[0].deltaX;
        if (deltaX > -10 && deltaX < 10) {
          setChecked(!checked);
        }
        // 判断左右划动
        if (!deleting && deltaX < -20) {
          swipe();
        }
        if (deleting && deltaX > 20) {
          swipe();
        }
      }
    }
  };

  const handleItemTouchStart = (e: Rax.TouchEvent) => {
    onTouchStart(e);
  };

  const handleItemTouchEnd = (e: Rax.TouchEvent) => {
    onTouchEnd(e);
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

  const listItemIconClass = classnames('list-item-icon', {
    'list-item-icon-checked': checked
  });
  const listItemTitleClass = classnames('list-item-title', {
    'list-item-title-completed': checked
  });

  return (
    <GestureView onHorizontalPan={handleHorizontalPan}>
      <View
        ref={ref}
        style={{
          flexDirection: 'row',
          width: '925rpx',
          ...style
        }}
        onTouchStart={handleItemTouchStart}
        onTouchEnd={handleItemTouchEnd}
      >
        <View className="list-item">
          <View className={listItemIconClass}></View>
          <Text className={listItemTitleClass}>{` ${title} `}</Text>
        </View>
        {deleting ? (
          <View
            className="list-item-deleting"
            onTouchEnd={handleDeleteBtnClick}
          >
            <Text className="list-item-deleting-content">删除</Text>
          </View>
        ) : null}
      </View>
    </GestureView>
  );
};

export default memo(ListItem);
