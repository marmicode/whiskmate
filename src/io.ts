import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

export function setupIoServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      methods: ['GET'],
    },
  });

  io.of('/recipes').on('connection', (socket) => {
    // @todo handle connection
  });
}
