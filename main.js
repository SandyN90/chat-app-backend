const express = require('express');
const router = require('./src/router/routes')
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const {Server}  = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});
const port = 8080;


app.use(cors({
    origin: '*'
}))
app.use(express.json());

const middleware = (to, from, next) => {
    if (to.path === '/') {
        console.log("Hi this is path /");
        next()
    }
    next();
};
app.use(middleware);
app.use(router);
app.options('*', cors());

io.on('connection', function(socket) {

    let msg = 'hi', user2Msg;

    socket.on('send', (value)=> {
        console.log("🚀 ~ file: main.js:37 ~ socket.on ~ value:", value)
        msg = value;
        const message = {
            message: value.message,
            timeStamp: value.timeStamp,
            direction: value.direction
        }
        socket.broadcast.emit('recieve', message);
    })

    // There will be two message events send and recieve
    // socket.emit('send', {
    //     // data will be send to user
    // })

    socket.emit('recieve', {})


    socket.emit('news', {hello: "sandy"});
    socket.on('recieve',(value)=> {
        console.log(value);
    })
    console.log("A user connected");
});

server.listen(port, () => console.log(`port is running on ${port}`));