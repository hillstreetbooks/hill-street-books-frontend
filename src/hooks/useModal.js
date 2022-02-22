import { useState } from 'react';

const useModal = () => {
  const [show, toggleVisibility] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  return {
    modalMessage,
    setModalMessage,
    show,
    toggleVisibility
  };
};

export default useModal;
