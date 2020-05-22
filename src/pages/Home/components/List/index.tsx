/**
 * @file 列表组件
 * @author 炽翎
 */
import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

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

  const hasBorderSum = list.length - 1;

  return (
    <View className="list">
      <Text className="list-title">我的列表</Text>
      <View className="list-wrapper">
        {list.map((item, index) => {
          const hasBorder = index < hasBorderSum;
          const style = hasBorder && {
            borderBottomWidth: '1px',
            borderBottomColor: '#dcdcdc'
          };
          return (
            <ListItem
              key={item.title}
              style={style}
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
