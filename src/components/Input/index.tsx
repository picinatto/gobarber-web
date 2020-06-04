import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import Tooltip from '../Tooltip';

import { Container, Error } from './styles';

// Adds the interface to receive the props
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  // Create react components to store the states

  // Stores the reference to the input
  const inputRef = useRef<HTMLInputElement>(null);
  // Stores the focused state
  const [isFocused, setIsFocused] = useState(false);
  // Stores the is filled (has information) state
  const [isFilled, setIsFilled] = useState(false);

  // Deconstruct to get wanted attributes from unform useField passing
  //  the name of the input
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // Function that handles the input receiving focus
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  // Function that handles the input receiving data
  const handleInputBlur = useCallback(() => {
    // reset to false
    setIsFocused(false);
    // checks if the input has values using the ref
    if (inputRef.current?.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, []);
  // Register event when the page load to register the input fields
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
