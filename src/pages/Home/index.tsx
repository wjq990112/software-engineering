/**
 * @file 首页
 * @author 炽翎
 */
import { createElement, useState, useEffect } from 'rax';
import ScrollView from 'rax-scrollview';
import { GET } from '../../utils/request';

import Class from './components/Class';
import List from './components/List';
import { IListItemProps } from './components/ListItem';

import './index.css';

interface IClassListResponseData {
  code: number;
  data: {
    classList: Array<IListItemProps>;
  };
}

export default function Home() {
  const [classList, setClassList] = useState([]);
  const [myList, setMyList] = useState([]);

  const getClassList = () => {
    const url: string =
      'https://www.fastmock.site/mock/485fad210a6a599c24499885d8bbdba9/api/getClassList';
    GET(url)
      .then((res: IClassListResponseData) => {
        setClassList(res.data.classList);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getClassList();
  }, []);

  return (
    <ScrollView className="home">
      <Class list={classList} />
      <List list={classList} />
    </ScrollView>
  );
}
