/**
 * @file 列表组件
 * @author 炽翎
 */
import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import ListItem, { ListItemProps } from '../ListItem';

import './index.css';

/**
 * @interface list: 分类列表
 */
interface ListProps {
  list?: Array<ListItemProps>;
}

const List: Rax.FC<ListProps> = (props) => {
  const { list } = props;

  return (
    <View className="list">
      <Text>我的列表</Text>
      <View className="list-wrapper">
        {list.map((item) => (
          <ListItem
            key={item.title}
            iconUrl={item.iconUrl}
            title={item.title}
            itemSum={item.itemSum}
          />
        ))}
      </View>
    </View>
  );
};

List.defaultProps = {
  list: []
};

export default List;
