/**
 * @file 首页
 * @author 炽翎
 */
import { createElement, useState, useEffect } from 'rax';
import ScrollView from 'rax-scrollview';
import axios from 'axios';

import Class from './components/Class';
import List from './components/List';

import './index.css';

export default function Home() {
  const [classList, setClassList] = useState([]);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    // TODO: 更改接口
    axios
      .get(
        'https://www.fastmock.site/mock/485fad210a6a599c24499885d8bbdba9/api/getClassList'
      )
      .then((res) => {
        const data = res.data.data;
        setClassList(data.classList);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <ScrollView className="home">
      <Class list={classList} />
      <List list={classList} />
    </ScrollView>
  );
}
