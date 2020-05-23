/**
 * @file 列表项组件测试
 * @author 炽翎
 */
import { createElement } from 'rax';
import renderer from 'rax-test-renderer';
import ListItem, { IListItemProps } from './index';

describe('Test ListItem Component', () => {
  // 测试显示
  it('Test ListItem Show', () => {
    const props: IListItemProps = {
      iconUrl:
        'https://img.alicdn.com/tfs/TB1H2Kcb1H2gK0jSZFEXXcqMpXa-70-72.png',
      title: 'Test',
      itemSum: 0
    };
    const component = renderer.create(<ListItem {...props} />);
    const tree = component.toJSON();
    expect(tree.tagName).toEqual('DIV');
    expect(tree.children[1].children[0]).toEqual(props.title);
    expect(tree.children[2].children[0]).toEqual(`${props.itemSum}`);
  });

  // 测试点击
  it('Test ListItem Click', () => {
    const props: IListItemProps = {
      iconUrl:
        'https://img.alicdn.com/tfs/TB1H2Kcb1H2gK0jSZFEXXcqMpXa-70-72.png',
      title: 'Test',
      itemSum: 0,
      onClick: jest.fn()
    };
    const component = renderer.create(<ListItem {...props} />);
    const tree = component.toJSON();
    expect(tree.eventListeners.click).toEqual(props.onClick);
  });
});
