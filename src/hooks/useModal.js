import { useState, useEffect, useCallback } from 'react';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('login');

  const openModal = useCallback((type = 'login') => {
    setModalType(type);
    setIsModalOpen(true);
    document.body.classList.add('no-scroll');
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.classList.remove('no-scroll');
  }, []);

  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen, closeModal]);

  return { isModalOpen, modalType, openModal, closeModal };
};
