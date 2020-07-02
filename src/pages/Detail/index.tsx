/**
 * @file 详情页
 * @author 炽翎
 */
import { createElement, useState, useEffect } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import Input from './components/Input';
import ListItem from './components/ListItem';
import { query } from '../../utils/tools';
import { GET } from '../../utils/request';

import './index.css';

export default function Detail() {
  const { type, index } = query || {};
  const [list, setList] = useState([]);

  const getList = () => {
    const url: string = `/get${
      type === 'default' ? 'List' : 'Class'
    }Detail`;
    GET({
      url,
      params: {
        id: index
      }
    })
      .then((res) => {
        setList(res.data.detailList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleItemChange = (str: string) => {
    const len = list.length;
    const newList = [
      ...list,
      {
        id: len + 1,
        title: str,
        completed: false
      }
    ];
    setList(newList);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <View className="detail">
      <View className="list-wrapper">
        {list.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            title={item.title}
            completed={item.completed}
          />
        ))}
      </View>
      <Input
        label="新增待办事项"
        placeholder="输入待办事项"
        onChange={handleItemChange}
      />
    </View>
  );
}
