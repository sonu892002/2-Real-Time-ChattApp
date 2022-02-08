const express = require('express')
const cors = require('cors')
const http = require('http')
const app = express()
const { Server } = require('socket.io')
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`user id: ${socket.id}`)

  socket.on('join_room', (room) => {
    socket.join(room)
    console.log(`user:${socket.id} joined room:${room}`)
  })

  socket.on('send_message', (data) => {
    console.log(data)
    socket.to(data.room).emit('recieve_message', data)
  })

  socket.on('disconnect', () => {
    console.log(`user exited: ${socket.id}`)
  })
})

server.listen(5000, () => {
  console.log('running on port 5000')
})
