/**
 * @file 详情页
 * @author 炽翎
 */
import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import Input from './Input';

import './index.css';

export default function Detail() {
  return (
    <View className="detail">
      <Input label="待办事项" placeholder="输入待办事项" />
    </View>
  );
}
