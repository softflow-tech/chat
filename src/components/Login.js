import React from 'react'
import { Button } from '@material-ui/core'
import { auth , provider} from "../firebase";

import '../css/Login.css';
import { actionTypes } from './reducer';
import { useStateValue } from "./StateProvider"


export default function Login(){

    const [{} , dispatch ]  = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) =>{
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => alert(error.message));
    };
    return(
        <div className='login'>
            <div className='login__container'>
                <div className='login__text'>
                    <h1>Sign into ChatiZone</h1>
                </div>
                <Button onClick={signIn}>Login with Google</Button>
            </div>
        </div>
    );
}