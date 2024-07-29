//
import { ORIGIN } from '../config.js';
import { Server } from 'socket.io';

export default function Socket(server, nameToListen, fn) {
  const io = new Server(server, {
    cors: {
      origin: ORIGIN[0]
    }
  });

  io.on('connection', (socket) => {
    console.log('client connected');

    socket.on(nameToListen, (token) => {
      //validate token with jwt
      //console.log("token: ", token);

      fn(socket);
    });

  });
}