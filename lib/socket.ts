import { Server as HTTPServer } from 'http';
import { Socket as ServerSocket, Server } from 'socket.io';

export interface ClientSocket extends ServerSocket {
  userId?: string;
}

let io: Server;

export const initSocket = (httpServer: HTTPServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_BASE_URL 
        : 'http://localhost:3000',
      credentials: true,
    },
  });

  io.on('connection', (socket: ClientSocket) => {
    console.log('[Socket.io] User connected:', socket.id);

    socket.on('user:join', (userId: string) => {
      socket.userId = userId;
      socket.join(`user:${userId}`);
      console.log('[Socket.io] User joined room:', `user:${userId}`);
    });

    socket.on('booking:created', (data) => {
      io.to(`user:${data.counselorId}`).emit('notification:new', {
        type: 'booking',
        message: 'New appointment booking received',
        data,
      });
    });

    socket.on('forum:reply', (data) => {
      io.to(`thread:${data.threadId}`).emit('notification:thread', {
        type: 'new_reply',
        message: 'New reply in discussion',
        data,
      });
    });

    socket.on('counselor:status', (data) => {
      io.emit('status:updated', {
        counselorId: data.counselorId,
        status: data.status,
      });
    });

    socket.on('disconnect', () => {
      console.log('[Socket.io] User disconnected:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
