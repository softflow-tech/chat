import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from 'react-router-dom'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import db from '../firebase'
import '../css/Contacts.css'

export default function ContactsCard({id, name, addNewContact}) {
    const createChat = () => {
        const username = prompt("Search People");
        
        if(username) {
            // database entries
            db.collection('rooms').add({
                name: username,
            })
        }
    };

    return !addNewContact ? (
        <div  className='contactCard'> 
            < Link to={`/account/${id}`}>
                <Avatar />
                <div className='contactCard__info'>
                    <h2>Hello</h2>
                </div>
            </Link> 
        </div>
    ) : (
       <div onClick={createChat} className='contactCard'>
           <h2 className='find'><PersonAddIcon /> Find Friends</h2>
           
       </div> 
    )
}