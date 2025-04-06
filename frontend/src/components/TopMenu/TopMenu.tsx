// src/components/TopMenu/TopMenu.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useActiveSessionsCounter } from '../../hooks/useActiveSessionsCounter';
import styles from './TopMenu.module.scss';

const TopMenu: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const activeSessions = useSelector((state: RootState) => state.ui.activeSessions);
  
  // Initialize WebSocket connection for active sessions counter
  useActiveSessionsCounter();

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Форматирование даты и времени в нужном формате
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(currentDateTime).toUpperCase();

  const formattedTime = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(currentDateTime);

  return (
    <div className={styles.topMenu}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z" />
          </svg>
        </div>
        <span className={styles.logoText}>INVENTORY</span>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.activeSessionsCounter}>
          <span className={styles.sessionsIcon}>👥</span>
          <span className={styles.count}>{activeSessions}</span>
          <span className={styles.label}>active {activeSessions === 1 ? 'session' : 'sessions'}</span>
        </div>
        <div className={styles.dateTimeContainer}>
          <div className={styles.dateText}>
            {currentDateTime.toLocaleDateString('en-US', { weekday: 'long' }) === new Date().toLocaleDateString('en-US', { weekday: 'long' }) ? 'Today' : currentDateTime.toLocaleDateString('en-US', { weekday: 'long' })}
          </div>
          <div className={styles.dateDetails}>
            {formattedDate} <span className={styles.timeIcon}>⏱</span> {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TopMenu);