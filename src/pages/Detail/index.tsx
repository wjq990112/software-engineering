/**
 * @file 详情页
 * @author 炽翎
 */
import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import Input from './components/Input';
import ListItem from './components/ListItem';

import './index.css';

export default function Detail() {
  return (
    <View className="detail">
      {/* TODO: 设计事项组件 */}
      <View className="list-wrapper">
        <ListItem id={1} title="测试" />
      </View>
      <Input label="新增待办事项" placeholder="输入待办事项" />
    </View>
  );
}
