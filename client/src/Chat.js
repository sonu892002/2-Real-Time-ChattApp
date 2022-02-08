import React from 'react'
import { useState, useEffect } from 'react'

function Chat({ socket, username, room }) {
  const [message, setmessage] = useState('')
  const [allmessage, setallmessage] = useState([])

  const sendtext = () => {
    if (message !== '') {
      const messagedata = {
        username: username,
        room: room,
        message: message,
        date:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      }
      setallmessage((allmessage) => [...allmessage, messagedata])
      socket.emit('send_message', messagedata)
    }
  }

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      setallmessage((allmessage) => [...allmessage, data])
      console.log(data)
    })
  }, [socket])
  return (
    <div className="fullpage">
      <div className="box">
        <div className="header">Live chat</div>
        <div className="body">
          {allmessage.map((x, key) => {
            return (
              <div
                key={key}
                className="bubble"
                id={username === x.username ? 'you' : 'other'}
              >
                {x.message}
                {x.username}
                {x.date}
              </div>
            )
          })}
        </div>
        <div className="footer">
          <input
            type="text"
            onChange={(e) => {
              setmessage(e.target.value)
            }}
          />
          <button onClick={sendtext}>cli</button>
        </div>
      </div>
    </div>
  )
}

export default Chat
