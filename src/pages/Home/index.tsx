/**
 * @file 首页
 * @author 炽翎
 */
import { createElement, useState, useEffect } from 'rax';
import ScrollView from 'rax-scrollview';
import request from 'universal-request';
import { ResponseData, ResponseError } from 'universal-request/lib/types';

import Class from './components/Class';
import List from './components/List';
import { IListItemProps } from './components/ListItem';

import './index.css';

interface IClassListResponseData {
  data: {
    code: number;
    data: {
      classList: Array<IListItemProps>;
    };
  };
}

type TClassListResponseData = IClassListResponseData & ResponseData;

export default function Home() {
  const [classList, setClassList] = useState([]);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    // TODO: 更改接口
    request({
      method: 'GET',
      url:
        'https://www.fastmock.site/mock/485fad210a6a599c24499885d8bbdba9/api/getClassList'
    })
      .then((response: TClassListResponseData) => {
        const data = response.data.data.classList;
        setClassList(data);
      })
      .catch((err: ResponseError) => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView className="home">
      <Class list={classList} />
      <List list={classList} />
    </ScrollView>
  );
}
