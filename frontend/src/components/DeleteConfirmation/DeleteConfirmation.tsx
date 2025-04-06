// src/components/DeleteConfirmation/DeleteConfirmation.tsx
"use client";

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { closeDeleteModal } from '../../redux/uiSlice';
import { RootState } from '../../redux/store';
import styles from './DeleteConfirmation.module.scss';

interface DeleteConfirmationProps {
  onConfirm: (id: string) => void;
}

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={styles.modal}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2>Вы уверены, что хотите удалить этот {itemToDelete.type === 'order' ? 'приход' : 'продукт'}?</h2>
            
            {itemToDelete.type === 'order' && (
              <div className={styles.itemDetails}>
                <div className={styles.productIcon}>
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#6c757d" d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" />
                  </svg>
                </div>
                <div className={styles.itemText}>
                  <div className={styles.itemTitle}>
                    {itemToDelete.title}
                  </div>
                  <div className={styles.itemDescription}>
                    SN-12 3456789
                  </div>
                </div>
              </div>
            )}
            
            <div className={styles.actions}>
              <button 
                className={styles.cancelButton}
                onClick={handleClose}
              >
                ОТМЕНИТЬ
              </button>
              <button 
                className={styles.deleteButton}
                onClick={handleConfirm}
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
                УДАЛИТЬ
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmation;