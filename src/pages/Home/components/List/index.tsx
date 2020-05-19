/**
 * @file 列表组件
 * @author 炽翎
 */
import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import classnames from 'classnames';

import ListItem, { IListItemProps } from '../ListItem';

import './index.css';

/**
 * @interface list: 分类列表
 */
interface IListProps {
  list?: Array<IListItemProps>;
}

const List: Rax.FC<IListProps> = (props) => {
  const { list } = props;

  return (
    <View className="list">
      <Text>我的列表</Text>
      <View className="list-wrapper">
        {list.map((item, index) => {
          // 最后一项不添加下边框
          const listItemClass = classnames({
            'list-item-border': index < list.length - 1
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
        })}
      </View>
    </View>
  );
};

List.defaultProps = {
  list: []
};

export default List;
