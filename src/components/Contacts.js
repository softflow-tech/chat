import React, {useState,useEffect} from "react";
import '../css/Contacts.css'
import { useStateValue } from "../components/StateProvider";
import ContactsCard from '../components/ContactsCard'
import db from '../firebase'
import { Link } from 'react-router-dom'

export default function Contacts() {
    const [{user}, dispatch ] = useStateValue();
    const [ users , setUsers ] = useState([]);

    useEffect( () => {
        const unsubscribe = db.collection('users').onSnapshot(snapshot =>(
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
        <div className='contacts'>
            <div className='contacts__header'>
                <h1>Contacts</h1>
            </div>
            <div className='contacts__cards'>
                <ContactsCard addNewContact/>
                {users && users.map(userDetails =>(
                    <ContactsCard userDetails={userDetails}/>
                ))}
            </div>
        </div>
    )
}
