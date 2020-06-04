/**
 * @file 事件输入组件
 * @author 炽翎
 */
import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import TextInput from 'rax-textinput';

import './index.css';

interface IInputProps {
  label: string;
  placeholder?: string;
}

const Input: Rax.FC<IInputProps> = (props) => {
  const { label, placeholder } = props;

  return (
    <View className="input-wrapper">
      <Text>{label}</Text>
      <TextInput className="input" placeholder={placeholder} />
    </View>
  );
};

export default Input;
