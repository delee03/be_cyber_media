const chatSocket = (io, socket) => {
    socket.on(`join-room`, (userChat) => {
        console.log({
            roomID_log: userChat,
        });
        let { user_id_sender, user_id_recipient } = userChat;

        const roomID = [user_id_sender, user_id_recipient].sort().join(`_`);
        console.log(roomID);
        socket.join(roomID);
        // socket.to(roomID).emit(`user-connected`, socket.id);
        // socket.on(`disconnect`, () => {
        //     socket.to(roomID).emit(`user-disconnected`, socket.id);
        // });
    });

    socket.on(`send-message`, (data) => {
        console.log(data);
        let { user_id_sender, user_id_recipient } = data;
        const roomID = [user_id_sender, user_id_recipient].sort().join(`_`);
        console.log(roomID);
        io.to(roomID).emit(`receive-message`, data);
    });
};

export default chatSocket;
