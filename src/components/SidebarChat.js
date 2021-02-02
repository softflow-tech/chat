import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from 'react-router-dom'
import db from '../firebase'
import '../css/SidebarChat.css'

export default function SidebarChat({id, name, addNewChat}) {
    const createChat = () => {
        const roomName = prompt("Please enter name for the chat room");
        
        if(roomName) {
            // database entries
            db.collection('rooms').add({
                name: roomName,
            })
        }
    };

    return !addNewChat ? (
        < Link to={`/rooms/${id}`}>
            <div  className='sidebarChat'> 
                <Avatar />
                <div className='sidebarChat__info'>
                    <h2>{name}</h2>
                    <p>Last message ..</p>
                </div>
            </div>
        </Link>
    ) : (
       <div onClick={createChat} className='sidebarChat'>
           <h2>Add New Chat</h2>
       </div> 
    )
}