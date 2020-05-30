/**
 * @file 事件输入组件
 * @author 炽翎
 */
import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import TextInput from 'rax-textinput';

const Input: Rax.FC = () => {
  return (
    <View>
      <Text>Input</Text>
      <TextInput />
    </View>
  );
};

export default Input;
