/**
 * @file 列表组件
 * @author 炽翎
 */
import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import classnames from 'classnames';

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

  const renderListItem = (item: ListItemProps, index: number) => {
    const listItemClass = classnames({
      'list-item-border': index < list.length
    });
    return (
      <ListItem
        key={item.title}
        className={listItemClass}
        iconUrl={item.iconUrl}
        title={item.title}
        itemSum={item.itemSum}
      />
    );
  };

  return (
    <View className="list">
      <Text>我的列表</Text>
      <View className="list-wrapper">
        {list.map((item, index) => renderListItem(item, index))}
      </View>
    </View>
  );
};

List.defaultProps = {
  list: []
};

export default List;
