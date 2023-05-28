"use client"

import dynamic from 'next/dynamic';
import { useModalAction, useModalState } from './modal.context';
import { Modal } from './modal';

const Logout = dynamic(() => import('../../modules/modals/LogoutModal'));
const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();
 
  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'LOGOUT' && <Logout />}
    </Modal>
  );
};

export default ManagedModal;
