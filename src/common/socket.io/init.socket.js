import { Server } from "socket.io";
import chatSocket from "./chat.socket.js";

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log(`${socket.id} user connected`);
        chatSocket(io, socket);
    });
};
export default initSocket;
