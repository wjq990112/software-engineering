/**
 * @file 列表项组件测试
 * @author 炽翎
 */
import { createElement } from 'rax';
import renderer from 'rax-test-renderer';
import ListItem, { IListItemProps } from './index';

describe('Test ListItem Component', () => {
  // 测试点击
  it('Test LinkItem Click', () => {
    const props: IListItemProps = {
      iconUrl:
        'https://img.alicdn.com/tfs/TB1H2Kcb1H2gK0jSZFEXXcqMpXa-70-72.png',
      title: 'Test',
      itemSum: 0,
      onClick: jest.fn()
    };
    const component = renderer.create(<ListItem {...props}></ListItem>);
    let tree = component.toJSON();
    expect(tree.eventListeners.click).toBe(props.onClick);
  });
});
