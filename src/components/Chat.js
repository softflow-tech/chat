import React, {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Avatar , IconButton } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

import db from '../firebase'
import '../css/Chat.css'
import { useStateValue } from "../components/StateProvider";


export default function Chat(){
    const [ input , setInput ] = useState("")
    const { roomId } = useParams();
    const [ roomName , setRoomName ] = useState("");
    const [ messages , setMessages ] = useState("");

    useEffect(() =>{
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
                setRoomName(snapshot.data().name));
            db.collection('rooms').doc(roomId).collection('messages').onSnapshot((snapshot) => setMessages(snapshot.docs.map(doc => doc.data())));
        }
    } , [roomId])
    
    const sendMessage = (e) =>{
        e.preventDefault();
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
                {messages.map(message => (
                    <p className={`chat__message ${false && 'chat__receiver'}`}>
                        <span className='chat__name'>
                            {message.name}
                        </span>
                        {message.message}
                        <span className='chat__timestamp'>
                            3:50PM
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
