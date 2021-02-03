import React, {useState,useEffect} from "react";
import { Avatar } from "@material-ui/core";
import { Link } from 'react-router-dom'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import db from '../firebase'
import '../css/Contacts.css'

export default function ContactsCard({id, name, addNewContact, userDetails}) {


    const findFriend = () => {
        const username = prompt("Search People");
        // temp = []
        if(username) {
            // database entries
            // users.map(userDetails => (
            //     {if (userDetails.displayName.includes(username)){
            //         temp.append(userDetails);
            //     }}
            // ));
        }
    };

    return !addNewContact ? (
        <div  className='contactCard'> 
            < Link to={`/account/${userDetails.id}`}>
                <Avatar src={userDetails.data.photoURL}/>
                <div className='contactCard__info'>
                    <h2>{userDetails.data.displayName}</h2>
                </div>
            </Link> 
        </div>
    ) : (
       <div onClick={findFriend} className='contactCard'>
           <h2 className='find'><PersonAddIcon /> Find Friends</h2>
           
       </div> 
    )
}