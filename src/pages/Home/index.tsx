/**
 * @file 首页
 * @author 炽翎
 */
import { createElement } from 'rax';
import ScrollView from 'rax-scrollview';

import Class from './components/Class';

import './index.css';

export default function Home() {
  return (
    <ScrollView className="home">
      <Class />
    </ScrollView>
  );
}
