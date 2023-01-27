import express from "express";
import * as http from "http";

const app = express();

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:81",
  },
});

var users = {};

io.on("connection", (socket) => {
  console.log("👾 New socket connected! >>", socket.id);

  // handles new connection
  socket.on("new-connection", (data) => {
    // captures event when new clients join
    console.log(`new-connection event received`, data);
    // adds user to list
    users[socket.id] = data.username;
    console.log("users :>> ", users);
    // emit welcome message event
    socket.emit("welcome-message", {
      user: "server",
      message: `Welcome to this Socket.io chat ${data.username}. There are ${
        Object.keys(users).length
      } users connected`,
    });
  });

  // handles message posted by client
  socket.on("new-message", (data) => {
    console.log(`👾 new-message from ${data.user}`);
    // broadcast message to all sockets except the one that triggered the event
    socket.broadcast.emit("broadcast-message", {
      user: users[data.user],
      message: data.message,
    });
  });

  socket.on("disconnect", function () {
    console.log(socket.id);
  });
});

httpServer.listen(3000, function () {
  console.log("listening on *:3000");
});
