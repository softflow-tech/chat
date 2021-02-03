import React, {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';

import db from '../firebase'
import '../css/Account.css'
import { useStateValue } from "../components/StateProvider";

export default function Account() {
    const { accountId } = useParams();
    const [{user}, dispatch ] = useStateValue();
    const [ userDetails , setUserDetails ] = useState("");


    useEffect( () => {
        const unsubscribe = db.collection('users').doc(accountId).onSnapshot((snapshot) => setUserDetails(snapshot.data()));
      
        return () => {
            unsubscribe();
        }
    },[]);

    const formHandler = () =>{
        db.collection('users').doc(user.uid).add({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        })
    }

    return accountId?(
        <div className='account'>
            <div className='account__header'>
                <img src={userDetails?.photoURL} alt='profile_picture' />
                <h1>{userDetails.displayName}</h1>
                
            </div>
            <div className='account__info'>
                <h2>Account information: </h2>
                <p><b>Email: </b>{userDetails.email}</p>
                {/* <p><b>Last Login: </b>{user.metadata.lastSignInTime}</p> */}
            </div>

        </div>
    ):(
        <div className='account'>
        <div className='account__header'>
            <img src={user?.photoURL} alt='profile_picture' />
            <h1>{user.displayName}</h1>
            
        </div>
        <div className='account__info'>
            <h2>Account information: </h2>
            <p><b>Email: </b>{user.email}</p>
            {/* <p><b>Last Login: </b>{user.metadata.lastSignInTime}</p> */}
        </div>

    </div>
    )
}