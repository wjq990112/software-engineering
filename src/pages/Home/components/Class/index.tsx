/**
 * @file 分类组件
 * @author 炽翎
 */
import { createElement, memo, useState, useContext } from 'rax';
import View from 'rax-view';

import ListItem from '../ListItem';
import { Context } from '../../index';

import './index.css';

const Class: Rax.FC = () => {
  const [deleting, setDeleting] = useState(false);
  const [timer, setTimer] = useState(null);
  const { state } = useContext(Context);
  const { classList } = state;

  const handleTouchStart = (e: Rax.TouchEvent) => {
    const timer = setTimeout(() => {
      setDeleting(!deleting);
    }, 500);
    setTimer(timer);
  };

  const handleTouchEnd = (e: Rax.TouchEvent) => {
    clearTimeout(timer);
    setTimer(null);
  };

  return (
    <View className="class">
      {classList.map((item) => (
        <View key={item.id}>
          <ListItem
            type="box"
            id={item.id}
            iconUrl={item.iconUrl}
            title={item.title}
            itemSum={item.itemSum}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
          {deleting ? (
            <View className="class-deleting">
              <View className="class-deleting-content"></View>
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
};

export default memo(Class);
