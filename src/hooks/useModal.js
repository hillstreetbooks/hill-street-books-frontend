import { useState } from 'react';

const useModal = (callback) => {
  const [title, setTitle] = useState('');
  const [show, toggleVisibility] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [value, setValue] = useState({ value: '', error: '' });

  const handleModalSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (value.value === '') {
      setValue({ ...value, error: 'This field cannot be empty' });
    } else {
      setValue({ ...value, error: '' });
      toggleVisibility(!show);
      callback();
    }
  };

  return {
    modalMessage,
    show,
    title,
    value,
    setModalMessage,
    setTitle,
    setValue,
    toggleVisibility,
    handleModalSubmit
  };
};

export default useModal;
