/**
 * @file 网络请求方法
 */
import request from 'universal-request';
import { ResponseData, AsObject } from 'universal-request/lib/types';

export const GET = async <T extends AsObject>(url: string, params?: T) => {
  try {
    const res: ResponseData = await request({
      method: 'GET',
      url: url,
      data: params
    });
    return res.data;
  } catch (err) {
    throw Error(err);
  }
};
