import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import ContactsIcon from '@material-ui/icons/Contacts';
import GroupIcon from '@material-ui/icons/Group';
import '../css/Sidebar.css'
import SidebarChat from './SidebarChat'
import DirectMessages from './DirectMessages'
import { useStateValue } from "../components/StateProvider";
import db from '../firebase'

export default function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })
            ))
        ));
        return () => {
            unsubscribe();
        }
    }, []);
    return (
        <div className='sidebar'>
            {/* <h1>sidebar</h1> */}
            <div className='sidebar__header'>
                <div className='sidebar__headerRight'>
                    <Link to='/contacts'>
                        <IconButton>
                            <ContactsIcon />
                        </IconButton>
                    </Link>
                </div>
                < Link to={`/account/`}>
                    <Avatar src={user?.photoURL} />
                </ Link>
            </div>
            <Tabs  className='sidebar__headerRight' defaultActiveKey="profile" id="uncontrolled-tab-example" variant='pills' >
                <Tab eventKey="chat" title={<IconButton><GroupIcon /></IconButton>}>
                    <div className='sidebar__chats'>

                        <SidebarChat addNewChat />
                        {rooms.map(room => (
                            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                        ))}

                    </div>
                </Tab>
                <Tab eventKey="dm" title={<IconButton><ChatIcon /></IconButton>}>
                    <DirectMessages />
                </Tab>
            </Tabs>
        </div>
    )
}
