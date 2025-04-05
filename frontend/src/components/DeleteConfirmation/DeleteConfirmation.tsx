import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { closeDeleteModal } from '../../redux/uiSlice';
import { RootState } from '../../redux/store';
import styles from './DeleteConfirmation.module.scss';

interface DeleteConfirmationProps {
  onConfirm: (id: string) => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay: 0.1 } },
  exit: { scale: 0.8, opacity: 0 },
};

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm }) => {
  const dispatch = useDispatch();
  const { isDeleteModalOpen, itemToDelete } = useSelector((state: RootState) => state.ui);

  const handleClose = () => {
    dispatch(closeDeleteModal());
  };

  const handleConfirm = () => {
    if (itemToDelete) {
      onConfirm(itemToDelete.id);
      dispatch(closeDeleteModal());
    }
  };

  return (
    <AnimatePresence>
      {isDeleteModalOpen && itemToDelete && (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div 
            className={styles.modal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2>Delete Confirmation</h2>
            <p>
              Are you sure you want to delete this {itemToDelete.type}:
              <strong> {itemToDelete.title}</strong>?
            </p>
            <p className={styles.warning}>This action cannot be undone!</p>
            <div className={styles.buttons}>
              <button 
                className={styles.cancelButton}
                onClick={handleClose}
              >
                Cancel
              </button>
              <button 
                className={styles.deleteButton}
                onClick={handleConfirm}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmation;