import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import './style.css';
import './loader.css';
import { v4 as uuid } from 'uuid';

let SOCKET_BASE_URL = process.env.SOCKET_BASE_URL;

const WebSocketChat = () => {
  const [userName, setUserName] = useState('');
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const id = uuid();

  const subscribeOnAuth = async () => {
    try {
      const { data } = await axios.get(`/login?id=${id}`);
      const name = `${data.firstName} ${data.lastName}`;
      setUserName(name);
      localStorage.setItem('userName', name);
      setShowLogin(false);
    } catch (err) {
      console.error(err);
      subscribeOnAuth();
    }
  };

  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const subscribe = async () => {
    socket.current = new WebSocket(SOCKET_BASE_URL);
    socket.current.onopen = () => {
      console.log(`WebSocket connection was created with:${SOCKET_BASE_URL}`);
      setConnected(true);
    };
    socket.current.onclose = () => {
      console.log(`WebSocket connection was closed`);
      setConnected(false);
      setTimeout(() => {
        console.log(`WebSocket connection retried`);
        subscribe();
      }, 1000);
    };
    socket.current.onerror = (error) => {
      console.log(`WebSocket connection has error`, error);
    };

    socket.current.onmessage = (event) => {
      const message = event.data.toString();
      console.log(`WebSocket connection has message:${message}`);
      setMessages((prev) => [...prev, JSON.parse(message)]);
    };
  };
  useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      setUserName(userName);
      setShowLogin(false);
      subscribe();
    } else {
      subscribeOnAuth()
        .then(() => subscribe());
    }
  }, []);

  const sendMessage = async () => {
    const message = {
      userName,
      text: value,
      date: Date.now()
    };
    socket.current.send(JSON.stringify(message));
  };

  return (
    <>
      <div className="login" style={{ display: showLogin || !connected ? 'flex' : 'none' }}>
        <input type="text" value={id} readOnly />
        {
          (!userName || !connected) &&
          <div class="lds-facebook"><div></div><div></div><div></div></div>
        }
      </div>
      <div className="container">
        <div className="form">
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)} />
          <button onClick={sendMessage}>Send message</button>
        </div>
        <div className="messages">
          {messages.map(message => <div>
            <div>
              <b>{message.userName}</b><br />
              <b style={{ fontSize: '10px' }}>{new Date(message.date).toISOString()}</b>
            </div>
            <div>{message.text}</div>
          </div>)}
        </div>
      </div>
    </>
  );
};

export default WebSocketChat;
