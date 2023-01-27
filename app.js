import express from 'express';
import * as http from 'http';

const app = express();

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:81"
  }
});

app.get("/", function (req, res) {
  res.sendFile("D:/devcheck/demo/socket.io/index.html");
});

io.on("connection", function (socket) {
  console.log("A user connected");

  // Send a message after a timeout of 4seconds
  setTimeout(function () {
    // socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
  }, 4000);
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
  socket.on("clientEvent", function (data) {
    console.log('sdf');
    socket.emit('testerEvent', { description: data});
  });
});
httpServer.listen(3000, function () {
  console.log("listening on *:3000");
});
