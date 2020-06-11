import React, { useEffect } from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  // Runs the function when the Toast is created
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    /*
      Automatically runs the function if the component does not exists anymore

      All functions return from useEffect are automatically run when the
      component is no longer existent

      So, if the user closes the Toast manually, the timeout is cleared
    */

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container type={message.type} hasDescription={!!message.description}>
      <FiAlertCircle size={20} />
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
