import express from "express";
import http from 'http';
import useSocket from "socket.io"
import path from "path";
import cors from "cors";

import { isProduction } from "./config";

import * as routers from "./routes";

const app = express();
export const server = http.Server(app);
const io = useSocket(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "..", "build")));

// app.use(`/auth`, routers.auth);
app.use(path.join(process.env.API_BASE,'/auth'),  routers.auth);
// app.use(`/users`, routers.users);
app.use(path.join(process.env.API_BASE,'/users'),  routers.users);
// app.use(`/chat`, routers.chat);
app.use(path.join(process.env.API_BASE,'/chat'),  routers.chat);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

// default
app.get("*", (req, res) => {
  res.send("hello");
});

// error 404
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// error 500
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", {
    message: error.message,
    error: !isProduction ? error : {},
    title: "Oops... error 500",
  });
});

export default app;
