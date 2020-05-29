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
