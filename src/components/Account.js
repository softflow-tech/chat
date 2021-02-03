import React, {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';

import db from '../firebase'
import '../css/Account.css'
import { useStateValue } from "../components/StateProvider";

export default function Account() {
    const { accountId } = useParams();
    const [{user}, dispatch ] = useStateValue();
    const [ userDetails , setUserDetails ] = useState("");

    const formHandler = () =>{
        db.collection('users').doc(user.uid).set({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        })
    }

    return(
        <div className='account'>
            <div className='account__header'>
                <img src={user?.photoURL} alt='profile_picture' />
                <h1>{user.displayName}</h1>
                
            </div>
            <div className='account__info'>
                <h2>Account information: </h2>
                <p><b>Email: </b>{user.providerData[0].email}</p>
                <p><b>Last Login: </b>{user.metadata.lastSignInTime}</p>

            </div>

        </div>
    )
}