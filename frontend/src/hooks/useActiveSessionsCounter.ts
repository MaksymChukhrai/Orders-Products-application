import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { setActiveSessions } from '../redux/uiSlice';

export const useActiveSessionsCounter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('http://localhost:4000');

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('sessionUpdate', (data: { count: number }) => {
      dispatch(setActiveSessions(data.count));
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};