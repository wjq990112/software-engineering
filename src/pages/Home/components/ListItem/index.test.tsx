/**
 * @file 列表项组件测试
 * @author 炽翎
 */
import { createElement } from 'rax';
import renderer from 'rax-test-renderer';
import ListItem, { IListItemProps } from './index';

beforeAll(() => {
  jest.useFakeTimers();
});

describe('Test ListItem Component', () => {
  // Default
  it('Test Default ListItem', () => {
    const props: IListItemProps = {
      id: 1,
      iconUrl: '',
      title: 'Test',
      itemSum: 0,
      onTouchStart: jest.fn(),
      onTouchEnd: jest.fn(),
      onDelete: jest.fn()
    };
    const component = renderer.create(<ListItem {...props} />);
    const tree = component.toJSON();
    jest.runAllTimers();

    // 测试显示
    expect(tree.tagName).toEqual('DIV');
    expect(tree.children[0].tagName).toEqual('DIV');
    expect(tree.children[0].children[0].children[1].tagName).toEqual('SPAN');
    expect(tree.children[0].children[0].children[2].tagName).toEqual('SPAN');
    expect(tree.children[0].children[0].children[1].children[0]).toEqual(
      props.title
    );
    expect(tree.children[0].children[0].children[2].children[0]).toEqual(
      String(props.itemSum)
    );

    // 测试点击
    const touchstart = jest.spyOn(
      tree.children[0].eventListeners,
      'touchstart'
    );
    tree.children[0].eventListeners.touchstart = touchstart;
    tree.children[0].eventListeners.touchstart();
    expect(touchstart).toHaveBeenCalled();
    const touchend = jest.spyOn(tree.children[0].eventListeners, 'touchend');
    tree.children[0].eventListeners.touchend = touchend;
    tree.children[0].eventListeners.touchend();
    expect(touchend).toHaveBeenCalled();

    // 测试滑动
    const horizontalPan = jest.spyOn(tree.eventListeners, 'horizontalpan');
    tree.eventListeners.horizontalPan = horizontalPan;
    tree.eventListeners.horizontalPan();
    expect(horizontalPan).toHaveBeenCalled();
    expect(tree.children[0].children[1]).toBeDefined();

    // TODO: 测试删除
    const ondelete = jest.spyOn(
      tree.children[0].children[1].eventListeners,
      'touchend'
    );
    tree.children[0].children[1].eventListeners.touchend = ondelete;
    expect(
      tree.children[0].children[1].eventListeners.touchend
    ).not.toHaveBeenCalled();
  });

  // Box
  it('Test Box ListItem', () => {
    const props: IListItemProps = {
      id: 1,
      type: 'box',
      iconUrl: '',
      title: 'Test',
      itemSum: 0,
      onTouchStart: jest.fn(),
      onTouchEnd: jest.fn()
    };
    const component = renderer.create(<ListItem {...props} />);
    const tree = component.toJSON();

    // 测试显示
    expect(tree.tagName).toEqual('DIV');
    expect(tree.children[0].tagName).toEqual('DIV');
    expect(tree.children[0].children[0].children[1].tagName).toEqual('SPAN');
    expect(tree.children[0].children[0].children[2].tagName).toEqual('SPAN');
    expect(tree.children[0].children[0].children[1].children[0]).toEqual(
      props.title
    );
    expect(tree.children[0].children[0].children[2].children[0]).toEqual(
      String(props.itemSum)
    );

    // 测试点击
    const touchstart = jest.spyOn(
      tree.children[0].eventListeners,
      'touchstart'
    );
    tree.children[0].eventListeners.touchstart = touchstart;
    tree.children[0].eventListeners.touchstart();
    expect(touchstart).toHaveBeenCalled();
    const touchend = jest.spyOn(tree.children[0].eventListeners, 'touchend');
    tree.children[0].eventListeners.touchend = touchend;
    tree.children[0].eventListeners.touchend();
    expect(touchend).toHaveBeenCalled();

    // 测试滑动
    const horizontalPan = jest.spyOn(tree.eventListeners, 'horizontalpan');
    tree.eventListeners.horizontalPan = horizontalPan;
    tree.eventListeners.horizontalPan();
    expect(horizontalPan).toHaveBeenCalled();
    expect(tree.children[0].children[1]).toBeUndefined();
  });
});
