/**
 * @file 网络请求方法
 */
import request from 'universal-request';
import { ResponseData, AsObject, DATA_TYPE } from 'universal-request/lib/types';

interface IGetParams<T> {
  url: string;
  params?: T;
}

export const GET = async <T extends AsObject>({
  url,
  params
}: IGetParams<T>) => {
  try {
    const res: ResponseData = await request({
      method: 'GET',
      url,
      data: params
    });
    return res.data;
  } catch (err) {
    throw Error(err);
  }
};

interface IPostParams<T> {
  url: string;
  params?: T;
  dataType?: DATA_TYPE;
}

export const POST = async <T extends AsObject>({
  url,
  params,
  dataType
}: IPostParams<T>) => {
  try {
    const res: ResponseData = await request({
      method: 'POST',
      url,
      data: params,
      dataType
    });
    return res.data;
  } catch (err) {
    throw Error(err);
  }
};
