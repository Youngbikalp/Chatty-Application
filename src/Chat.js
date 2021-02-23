import React, {useState,useEffect} from 'react'
import {Avatar} from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import "./Chat.css"
import MicIcon from '@material-ui/icons/Mic';
//import { set } from 'mongoose';
import axios from "./axios";
function Chat({messages}) {

    const [seed, setSeed] = useState("");
    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);
    const [input, setInput] = useState("");
    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new',{
            message: input,
            name: "Demo App", //pass in from the auth
            timestamp: "Just now!",
            received: false,
        });

        setInput(''); //after entering the messege, clears it
    };
    return (
        <div className = "chat">
            <div className="chat__header">
                <Avatar src ={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                
                <div className = "chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className = "chat__headerRight">
                <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className = "chat__body">
                {messages.map((message) => (
                      <p className = {`chat__message ${message.received && "chat__reciever"}`}>
                      <span className="chat__name">{message.name}
                      </span>
                      {message.message}
                      <span className="chat__timestamp">{message.timestamp}</span> 
                      </p>
                ))}

            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value = {input} onChange = {e => setInput (e.target.value)}
                    placeholder="Type a message"
                    type = "text"
                />
                <button onClick ={sendMessage}
                type = "submit">Send a message </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
