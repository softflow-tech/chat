import React, {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Avatar , IconButton } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

import db from '../firebase'
import firebase from 'firebase'
import '../css/Chat.css'
import { useStateValue } from "../components/StateProvider";


function Chat(){
    const { roomId } = useParams();
    const [ input , setInput ] = useState("")
    const [ roomName , setRoomName ] = useState("");
    const [ messages , setMessages ] = useState("");
    const [{user}, dispatch ] = useStateValue();


    useEffect(() =>{
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
                setRoomName(snapshot.data().name));
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    } , [roomId])

    const sendMessage = (e) =>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }
    return(
        <div className='chat'>
            <div className='chat__header'>
                <Avatar />
                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton> 
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton> 
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton> 
                </div>
            </div>
            <div className='chat__body'>
                {messages.data.map((message) => (
                    <p className={`chat__message ${true && 'chat__receiver'}`}>
                        <span className='chat__name'>
                            {message.name}
                        </span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>   
            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e)=>setInput(e.target.value)} type='text' placeholder='Type a message' />
                    <button type='submit' onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat;