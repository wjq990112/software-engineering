/**
 * @file 分类组件
 * @author 炽翎
 */
import { createElement } from 'rax';
import View from 'rax-view';

import Box, { BoxProps } from '../../../../components/Box';

import './index.css';

/**
 * @interface list: 分类列表
 */
interface ClassProps {
  list?: Array<BoxProps>;
}

const Class: Rax.FC<ClassProps> = (props) => {
  const { list } = props;

  return (
    <View className="class">
      {list.map((item) => (
        <Box
          key={item.title}
          iconUrl={item.iconUrl}
          title={item.title}
          itemSum={item.itemSum}
        />
      ))}
    </View>
  );
};

Class.defaultProps = {
  list: [
    {
      iconUrl:
        'https://img.alicdn.com/tfs/TB1H2Kcb1H2gK0jSZFEXXcqMpXa-70-72.png',
      title: '今天',
      itemSum: 0
    },
    {
      iconUrl:
        'https://img.alicdn.com/tfs/TB1H2Kcb1H2gK0jSZFEXXcqMpXa-70-72.png',
      title: '计划',
      itemSum: 0
    },
    {
      iconUrl:
        'https://img.alicdn.com/tfs/TB1H2Kcb1H2gK0jSZFEXXcqMpXa-70-72.png',
      title: '全部',
      itemSum: 0
    },
    {
      iconUrl:
        'https://img.alicdn.com/tfs/TB1H2Kcb1H2gK0jSZFEXXcqMpXa-70-72.png',
      title: '旗标',
      itemSum: 0
    }
  ]
};

export default Class;
