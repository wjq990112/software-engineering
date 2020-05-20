/**
 * @file 首页
 * @author 炽翎
 */
import { createElement, useState, useEffect } from 'rax';
import ScrollView from 'rax-scrollview';

import Class from './components/Class';
import List from './components/List';
import { GET } from '../../utils/request';
import { IListItemProps } from './components/ListItem';

import './index.css';

interface IClassListResponseData {
  code: number;
  data: {
    classList: Array<IListItemProps>;
  };
  message: string;
}

interface IMyListResponseData {
  code: number;
  data: {
    myList: Array<IListItemProps>;
  };
  message: string;
}

export default function Home() {
  const [classList, setClassList] = useState([]);
  const [myList, setMyList] = useState([]);

  const getClassList = () => {
    // TODO: 修改URL
    const url: string =
      'https://www.fastmock.site/mock/485fad210a6a599c24499885d8bbdba9/api/getClassList';
    GET({ url })
      .then((res: IClassListResponseData) => {
        if (res.code === 200) {
          setClassList(res.data.classList);
        } else {
          console.log(res.message);
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  const getMyList = () => {
    // TODO: 修改URL
    const url: string =
      'https://www.fastmock.site/mock/485fad210a6a599c24499885d8bbdba9/api/getMyList';
    GET({ url })
      .then((res: IMyListResponseData) => {
        if (res.code === 200) {
          setMyList(res.data.myList);
        } else {
          console.log(res.message);
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getClassList();
    getMyList();
  }, []);

  return (
    <ScrollView className="home">
      <Class list={classList} />
      <List list={myList} />
    </ScrollView>
  );
}
