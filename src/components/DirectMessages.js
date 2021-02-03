import React, {useState,useEffect} from "react";
import { Avatar } from "@material-ui/core";
import { Link } from 'react-router-dom'
import db from '../firebase'
import '../css/DirectMessages.css'
import { useStateValue } from "../components/StateProvider";

export default function DirectMessages({id, name, addNewChat}) {
    const [{user}, dispatch ] = useStateValue();
    const [ users , setUsers ] = useState([]);

    useEffect( () => {
        const unsubscribe = db.collection('dm').onSnapshot(snapshot =>(
            setUsers(snapshot.docs.map(doc =>({
                id: doc.id,
                data : doc.data()
            })
            ))
        ));
        return () => {
            unsubscribe();
        }
    },[users]);
    return(
        // < Link to={`/dm/${id}`}>
            <div  className='directMessages'> 
                <Avatar />
                <div className='directMessages__info'>
                    <h2>{name}</h2>
                    <p>DIRECT MESSAGES</p>
                </div>
            </div>
        // </Link>
    )
}