
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const connectDB = require('./config/db');
// const seedAdmin = require('./utils/seedAdmin');

// const app = express();
// const server = http.createServer(app); // create HTTP server
// const io = new Server(server, {
//   cors: {
//     //origin: 'http://localhost:5173', // frontend URL
//     origin: [
//   "http://localhost:5173",
//   "https://society-gate-frontend.onrender.com"
// ],

//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
//   },
// });

// //app.use(cors());
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://society-gate-frontend.onrender.com"
//   ],
//   credentials: true
// }));

// app.use(express.json());

// // store io globally so controllers can use it
// app.set('io', io);

// connectDB().then(() => seedAdmin());

// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/admin', require('./routes/admin'));
// app.use('/api/guard', require('./routes/guard'));
// app.use('/api/resident', require('./routes/resident'));
// app.use('/api/password', require('./routes/password'));
// app.use('/api/staff', require('./routes/staff'));
// app.use('/api/attendance', require('./routes/attendance'));


// app.get('/', (req, res) => res.send('Society Gate API'));

// // Socket.IO connections
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('visitorUpdate', (data) => {
//     // broadcast to all except sender
//     socket.broadcast.emit('visitorUpdate', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });


// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log('Server running on', PORT));




// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const connectDB = require('./config/db');
// const seedAdmin = require('./utils/seedAdmin');

// const app = express();
// const server = http.createServer(app); // create HTTP server
// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });


// //app.use(cors());
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://society-gate-frontend.onrender.com"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin (mobile apps, curl, Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }
//     return callback(new Error("CORS not allowed: " + origin));
//   },
//   credentials: true
// }));


// app.use(express.json());

// // store io globally so controllers can use it
// app.set('io', io);

// connectDB().then(() => seedAdmin());

// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/admin', require('./routes/admin'));
// app.use('/api/guard', require('./routes/guard'));
// app.use('/api/resident', require('./routes/resident'));
// app.use('/api/password', require('./routes/password'));
// app.use('/api/staff', require('./routes/staff'));
// app.use('/api/attendance', require('./routes/attendance'));


// app.get('/', (req, res) => res.send('Society Gate API'));

// // Socket.IO connections
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('visitorUpdate', (data) => {
//     // broadcast to all except sender
//     socket.broadcast.emit('visitorUpdate', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });


// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log('Server running on', PORT));



require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');
const path = require('path');


const app = express();

// 💥 Moved allowedOrigins ABOVE everything
const allowedOrigins = [
  "http://localhost:5173",
  "https://society-gate-frontend.onrender.com"
];

const server = http.createServer(app); 

// SOCKET.IO FIXED
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// GLOBAL CORS FIXED
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS not allowed: " + origin));
  },
  credentials: true
}));

app.use(express.json());

app.set('io', io);

connectDB().then(() => seedAdmin());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/guard', require('./routes/guard'));
app.use('/api/resident', require('./routes/resident'));
app.use('/api/password', require('./routes/password'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/attendance', require('./routes/attendance'));
app.use("/api/news", require("./routes/news"));

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads"))); // serve images
app.use("/api/rent", require("./routes/rent"));



app.get('/', (req, res) => res.send('Society Gate API'));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('visitorUpdate', (data) => {
    socket.broadcast.emit('visitorUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Server running on', PORT));
