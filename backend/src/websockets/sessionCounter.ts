import { Server } from 'socket.io';
import http from 'http';

let activeSessions = 0;

export function setupSessionCounter(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    activeSessions++;
    io.emit('sessionUpdate', { count: activeSessions });
    
    console.log(`Client connected. Active sessions: ${activeSessions}`);
    
    socket.on('disconnect', () => {
      activeSessions = Math.max(0, activeSessions - 1);
      io.emit('sessionUpdate', { count: activeSessions });
      console.log(`Client disconnected. Active sessions: ${activeSessions}`);
    });
  });

  return io;
}