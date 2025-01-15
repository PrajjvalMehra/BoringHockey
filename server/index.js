const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors")
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(cors())
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://192.168.127.170:5174', // replace with your frontend URL
        methods: ['GET', 'POST']
    },
});

io.sockets.sockets.forEach((socket) => {
    socket._cleanup();
    socket.offAnyOutgoing();
    socket.disconnect();
})


io.on("connection", (socket) => {

    console.log(uuidv4())
    console.log("A user connected");

    socket.on('updateBallPositions', (ballPositions) => {
        console.log('Received ball positions:', ballPositions); // You can now broadcast the positions to other clients or handle them as needed io.emit('broadcastBallPositions', ballPositions); });
        io.emit("broadcastBallPositions", ballPositions)
    });



    socket.on("disconnect", () => {
        socket.removeAllListeners();
        socket._cleanup();
        socket.offAnyOutgoing();
        socket.disconnect();
    });
})


httpServer.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});