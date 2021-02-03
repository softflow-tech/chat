import React, {useState , useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom';
import { Avatar , IconButton } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

import db , {firebaseApp} from '../firebase'
import firebase from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import '../css/Chat.css'
import { useStateValue } from "../components/StateProvider";


export default function Chat(){
    const dummy = useRef();
    const { roomId } = useParams();
    const [ roomName , setRoomName ] = useState("");
    const [{user}, dispatch ] = useStateValue();
    const messagesRef = db.collection('rooms').doc(roomId).collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');
  


    useEffect(() =>{
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
                setRoomName(snapshot.data().name));
        }
    } , [roomId])
    
  
    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, displayName } = user;
  
        messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            displayName
        })
  
        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    const attach = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const storageRef = firebaseApp.ref()
        const fileRef = storageRef.child(file.name)
        fileRef.put(file)
        const { uid, displayName } = user;
  
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            displayName
        })
  
        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
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
                    {/* <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton> */}
                    <IconButton>
                        <AttachFileIcon onclick={attach} />
                    </IconButton>  
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton> 
                </div>
            </div>
            <div className='chat__body'>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <span ref={dummy}></span>
            </div>   
            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                    <input value={formValue} onChange={(e)=>setFormValue(e.target.value)} type='text' placeholder='Type a message' />
                    <button type='submit' onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

  
  function ChatMessage(props) {
    const { text, createdAt, uid, displayName } = props.message;
    const [{user}, dispatch ] = useStateValue();

    const messageClass = uid === user.uid ? 'chat__receiver' : 'false';
    console.log(props.message)
    return (<>
      <div className={`chat__message ${messageClass}`}>
            <span className='chat__name'>
                {displayName}
            </span>
            {text}
      </div>
    </>)
  }
  
