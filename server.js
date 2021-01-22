// const app = require('express')();
// const server = require('http').createServer(app);
const PORT = 3000
const io = require('socket.io')();


io.sockets.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('message', (message) => {
        io.emit('message', message)
    })

    socket.on('turn', (turnObj) => {
        console.log(turnObj)

        io.emit('turn', turnObj)
    })
});


io.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
