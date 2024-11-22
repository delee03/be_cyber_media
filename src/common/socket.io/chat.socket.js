import prisma from "../prisma/init.prisma.js";

const chatSocket = (io, socket) => {
    socket.on(`join-room`, (userChat) => {
        console.log({
            roomID_log: userChat,
        });
        let { user_id_sender, user_id_recipient } = userChat;

        const roomId = [user_id_sender, user_id_recipient].sort((a,b) => a - b ).join("_");
        console.log(roomId);

        socket.rooms.forEach((roomId) => { 
            socket.leave(roomId);
         })

        socket.join(roomId);

      
        //rooms laf danh sach cua socket cac room dang ton tai
        // socket.to(roomID).emit(`user-connected`, socket.id);
        // socket.on(`disconnect`, () => {
        //     socket.to(roomID).emit(`user-disconnected`, socket.id);
        // });
    });

    socket.on(`send-message`, async (data) => {
        console.log(data);
        let { user_id_sender, user_id_recipient, message } = data;
        const roomId = [user_id_sender, user_id_recipient].sort((a,b) => a - b ).join("_");
        console.log(roomId);
        io.to(roomId).emit(`receive-message`, data);

        await prisma.chats.create({
            data: {
                message: message,
                user_id_sender: user_id_sender,
                user_id_recipient: user_id_recipient,

            }
        })

    });

    socket.on("get-list-message", async (payload) => { 
        const {user_id_sender, user_id_recipient} = payload;
        console.log({key: payload});
        const chats = await prisma.chats.findMany({
            where: {
                user_id_sender: {in: [user_id_sender, user_id_recipient]},
                user_id_recipient: {in: [user_id_sender, user_id_recipient]},
            }
        })

        const roomId = [user_id_sender, user_id_recipient].sort((a,b) => a - b ).join("_");

        io.to(roomId).emit("get-list-message", chats);
     })
};

export default chatSocket;
