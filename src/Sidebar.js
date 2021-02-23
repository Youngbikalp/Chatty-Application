import React from 'react'
import "./Sidebar.css"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {Avatar, IconButton} from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";

function Sidebar() {
    return (
        <div className='sidebar'>
            
            <div className = "sidebar__header">
                <Avatar src = "https://st.depositphotos.com/2869437/3739/i/950/depositphotos_37392643-stock-photo-close-up-of-pug.jpg"/>
                <div className = "sidebar__headerRight">
                    {/* DonutLargeIcon wrapped inside IconButton */}
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type = "text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
