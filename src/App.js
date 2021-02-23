import React, {useEffect, useState} from "react";
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";
function App() {
  const[messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
      setMessages(response.data);
    })

  }, []);
  useEffect(() => {
    const pusher = new Pusher('60641f221f65ae787e77', {
      cluster: 'us3'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages]); //dependency: 'messages'

  console.log(messages);

  return (
    <div className="app">
      <div className = "app__body">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat component */}
      <Chat messages={messages}/>
    </div>
    </div>
  );
}

export default App;
