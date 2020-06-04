/**
 * @file 加号
 * @author 炽翎
 */
import { createElement } from 'rax';
import View from 'rax-view';
import classnames from 'classnames';

import './index.css';

type TAddType = 'outlined' | 'filled';

interface IAddProps {
  type?: TAddType;
  onTouchEnd?: (e: Rax.TouchEvent) => void;
}

const Add: Rax.FC<IAddProps> = (props) => {
  const { type, onTouchEnd } = props;

  const wrapperClass = classnames({
    filled: type === 'filled',
    outlined: type === 'outlined'
  });
  const rowClass = classnames({
    'filled-row': type === 'filled',
    'outlined-row': type === 'outlined'
  });
  const colClass = classnames({
    'filled-col': type === 'filled',
    'outlined-col': type === 'outlined'
  });

  return (
    <View className={wrapperClass} onTouchEnd={onTouchEnd}>
      <View className={rowClass}></View>
      <View className={colClass}></View>
    </View>
  );
};

Add.defaultProps = {
  type: 'outlined',
  onTouchEnd: () => {}
};

export default Add;
