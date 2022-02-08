import './App.css'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import Chat from './Chat'

const socket = io('http://localhost:5000')

function App() {
  const [username, setusername] = useState('')
  const [room, setroom] = useState('')

  const submitted = (event) => {
    event.preventDefault()
    console.log(room)
    socket.emit('join_room', room)
  }
  return (
    <div className="App">
      <div className="entry">
        <h1>join room</h1>
        <form onSubmit={submitted}>
          <label>username:</label>
          <input
            type="text"
            onChange={(e) => {
              setusername(e.target.value)
            }}
          />
          <label>room:</label>
          <input
            type="text"
            onChange={(e) => {
              setroom(e.target.value)
            }}
          />
          <button type="submit">sumbit</button>
        </form>
      </div>
      <Chat socket={socket} username={username} room={room} />
    </div>
  )
}

export default App
