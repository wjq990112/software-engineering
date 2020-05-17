/**
 * @file Box 组件
 * @author 炽翎
 */
import { createElement } from 'rax';
import View from 'rax-view';
import Icon from 'rax-icon';
import Text from 'rax-text';

import './index.css';

/**
 * @interface iconUrl: 左上角 icon 地址
 * @interface title: 左下角 Box 标题
 * @interface itemSum: 右上角事件总数
 */
export interface BoxProps {
  iconUrl: string;
  title: string;
  itemSum?: number;
}

const Box: Rax.FC<BoxProps> = (props) => {
  const { iconUrl, title, itemSum } = props;

  return (
    <View className="box">
      <Icon
        source={{
          uri: iconUrl
        }}
      />
      <Text>{itemSum}</Text>
      <Text>{title}</Text>
    </View>
  );
};

Box.defaultProps = {
  itemSum: 0
};

export default Box;
