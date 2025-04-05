import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { formatDateTime } from '../../utils/dateFormat';
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

  return (
    <div className={styles.topMenu}>
      <div className={styles.infoContainer}>
        <div className={styles.datetime}>
          {formatDateTime(currentDateTime.toISOString())}
        </div>
        <div className={styles.sessionsCounter}>
          <span className={styles.icon}>👥</span>
          <span className={styles.count}>{activeSessions}</span>
          <span className={styles.label}>active {activeSessions === 1 ? 'session' : 'sessions'}</span>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;