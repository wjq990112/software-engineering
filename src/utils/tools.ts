/**
 * @file 路由工具
 * @author 炽翎
 */
import Navigate from 'universal-navigate';

export const push = ({
  url,
  animated
}: {
  url: string;
  animated?: boolean;
}) => {
  return new Promise((resolve, reject) => {
    Navigate.push({ url, animated })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const pop = ({ animated }: { animated?: boolean }) => {
  return new Promise((resolve, reject) => {
    Navigate.pop({ animated })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * 根据 search 获取传入qs， 生成 query object
 * @param qs
 * @returns {{}}
 */
function parseQueryString(qs) {
  const ret = {};
  try {
    const str = qs.split('+').join(' ');
    const reg = new RegExp(/[?&]?([^=]+)=([^&]*)/g);
    let tokens;
    do {
      tokens = reg.exec(str);
      // 设置
      if (tokens) {
        ret[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }
    } while (tokens);
  } catch (error) {
    console.warn('[@ali/universal-detector]: parseQueryString error');
  }
  return ret;
}

let query: { type?: string; index?: number } = {};

const search = location.search.substr(1);
query = parseQueryString(search);

export { query, parseQueryString };
