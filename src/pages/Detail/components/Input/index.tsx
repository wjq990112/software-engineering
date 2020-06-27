/**
 * @file 事件输入组件
 * @author 炽翎
 */
import { createElement, memo } from 'rax';
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
    <View>
      <Text className="label">{label}</Text>
      <View className="input-wrapper">
        <TextInput className="input" placeholder={placeholder} />
      </View>
    </View>
  );
};

export default memo(Input);
