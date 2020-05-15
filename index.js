// const http = require('http');
// const express = require('express');
// const socketio = require('socket.io');
// const cors = require('cors');
// const PORT = process.env.PORT || 5000
// const path = require('path');

// const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
// const router = require('./router');

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);

// app.use(cors());
// // app.use(router);

// // Serve static assets
// app.use('public', express.static(path.join(__dirname, 'build')));

// io.on('connection', (socket) => {
//     console.log('We have new connection!');

//     socket.on('join', ({name, room}, cb) => {
//         const {error, user} = addUser({id: socket.id, name, room});

//         if(error) return cb(error);

//         socket.emit('message', {user: 'admin', text: `${user.name} welcome to the ${user.room}`});
//         //broadcast send message to everyone 
//         socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name} has joined!`});
//         //socket join method
//         socket.join(user.room);

//         //show all the userin the room
//         io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
//         console.log(getUsersInRoom(user.room))
//         cb();
//     })


//     socket.on('sendMessage', (message, cb) => {
//         const user = getUser(socket.id);

//         io.to(user.room).emit('message' , {user: user.name, text:message});

//         cb();
//     })

//     socket.on('disconnect', () =>{
//         const user = removeUser(socket.id);
//         if(user){
//             io.to(user.room).emit('message', {user:'admin', text:`${user.name} has left`})
//             io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

//         }
//     })
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });


// server.listen(PORT, () => console.log(`Server has started at ${PORT}.`));


const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);