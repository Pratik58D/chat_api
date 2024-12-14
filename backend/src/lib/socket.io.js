import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors : {
        origin: ["http://localhost:5173"]
    },
});

export function getReceiverSocketId(userId){
    return userSocketMap[userId]
}

//used to store online users
const userSocketMap = {}; // {userId : socketId}

io.on("connection",(socket)=>{
    console.log("A user is connected: ",socket.id);
      
    //handling onlineusers
    const userId = socket.handshake.query.userId;    //Get userId from handshake query
    console.log(userId)
    if(userId) userSocketMap[userId] = socket.id;    // Map userId to socketId

    console.log(userSocketMap)

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log(`A user ${socket.id} disconnected.`);

        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})


export {io , app , server};