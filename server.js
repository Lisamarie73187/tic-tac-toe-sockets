// const app = require('express')();
// const server = require('http').createServer(app);
const PORT = 3000
const io = require('socket.io')();

let userIds = {};
let currentUserId = 2;
let currentMessageId = 1;

function createMessage(userId, messageText){
    return {
        _id: currentMessageId++,
        text: messageText,
        createdAt: new Date(),
        user: {
            id: userId,
            name: 'test',
            avatar: 'https://placeimg.com/140/140/any',
        }
    }
}

io.sockets.on('connection', (socket) => {
    console.log('a user connected');

    userIds[socket.id] = currentUserId++;

    socket.on('message', (messageText) => {
        const userId = userIds[socket.id];
        const message = createMessage(userId, messageText);
        socket.broadcast.emit('message', message)
    });




    socket.on('turn', (turnObj) => {
        console.log(turnObj)

        io.emit('turn', turnObj)
    })
});


io.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
