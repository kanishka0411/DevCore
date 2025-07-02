const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store active rooms and users
const rooms = new Map();
const users = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle room joining
  socket.on('join-room', ({ roomId, user }) => {
    socket.join(roomId);
    
    // Store user info
    users.set(socket.id, { ...user, socketId: socket.id, roomId });
    
    // Add user to room
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId).add(socket.id);
    
    // Notify room about new user
    socket.to(roomId).emit('user-joined', user);
    
    // Send current room users to the new user
    const roomUsers = Array.from(rooms.get(roomId))
      .map(id => users.get(id))
      .filter(Boolean);
    
    socket.emit('room-users', roomUsers);
    
    console.log(`User ${user.name} joined room ${roomId}`);
  });

  // Handle room leaving
  socket.on('leave-room', ({ roomId }) => {
    socket.leave(roomId);
    
    const user = users.get(socket.id);
    if (user) {
      // Remove user from room
      if (rooms.has(roomId)) {
        rooms.get(roomId).delete(socket.id);
        if (rooms.get(roomId).size === 0) {
          rooms.delete(roomId);
        }
      }
      
      // Notify room about user leaving
      socket.to(roomId).emit('user-left', user);
    }
    
    console.log(`User left room ${roomId}`);
  });

  // Handle WebRTC signaling
  socket.on('webrtc-signal', ({ roomId, signal, targetId }) => {
    socket.to(targetId).emit('webrtc-signal', {
      signal,
      fromId: socket.id
    });
  });

  // Handle voice chat events
  socket.on('voice-chat-toggle', ({ roomId, isActive }) => {
    const user = users.get(socket.id);
    if (user) {
      user.voiceChatActive = isActive;
      socket.to(roomId).emit('user-voice-status', {
        userId: socket.id,
        isActive
      });
    }
  });

  // Handle screen sharing events
  socket.on('screen-share-toggle', ({ roomId, isSharing }) => {
    const user = users.get(socket.id);
    if (user) {
      user.screenSharing = isSharing;
      socket.to(roomId).emit('user-screen-share', {
        userId: socket.id,
        isSharing
      });
    }
  });

  // Handle cursor/selection updates
  socket.on('cursor-update', ({ roomId, cursor, selection }) => {
    const user = users.get(socket.id);
    if (user) {
      user.cursor = cursor;
      user.selection = selection;
      socket.to(roomId).emit('user-cursor-update', {
        userId: socket.id,
        cursor,
        selection
      });
    }
  });

  // Handle game invites
  socket.on('game-invite', ({ roomId, gameType, targetUserId }) => {
    const sender = users.get(socket.id);
    if (sender) {
      socket.to(targetUserId).emit('game-invite-received', {
        id: `invite-${Date.now()}`,
        type: gameType,
        sender: sender,
        roomId
      });
    }
  });

  // Handle game invite responses
  socket.on('game-invite-response', ({ inviteId, response, roomId }) => {
    socket.to(roomId).emit('game-invite-response', {
      inviteId,
      response,
      userId: socket.id
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      // Remove from room
      if (rooms.has(user.roomId)) {
        rooms.get(user.roomId).delete(socket.id);
        if (rooms.get(user.roomId).size === 0) {
          rooms.delete(user.roomId);
        }
      }
      
      // Notify room about disconnection
      socket.to(user.roomId).emit('user-left', user);
    }
    
    users.delete(socket.id);
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`DevCore signaling server running on port ${PORT}`);
  console.log('Ready for WebRTC connections and collaboration features');
});