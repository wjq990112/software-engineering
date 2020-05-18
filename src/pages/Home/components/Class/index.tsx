/**
 * @file 分类组件
 * @author 炽翎
 */
import { createElement } from 'rax';
import View from 'rax-view';

import ListItem, { ListItemProps } from '../ListItem';

import './index.css';

/**
 * @interface list: 分类列表
 */
interface ClassProps {
  list?: Array<ListItemProps>;
}

const Class: Rax.FC<ClassProps> = (props) => {
  const { list } = props;

  return (
    <View className="class">
      {list.map((item) => (
        <ListItem
          key={item.title}
          type="box"
          iconUrl={item.iconUrl}
          title={item.title}
          itemSum={item.itemSum}
        />
      ))}
    </View>
  );
};

Class.defaultProps = {
  list: []
};

export default Class;
