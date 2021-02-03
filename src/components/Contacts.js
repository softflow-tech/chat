import React, {useState,useEffect} from "react";
import '../css/Contacts.css'
import { useStateValue } from "../components/StateProvider";
import ContactsCard from '../components/ContactsCard'

export default function Sidebar() {
    const [{user}, dispatch ] = useStateValue();

    return(
        <div className='contacts'>
            <div className='contacts__header'>
                <h1>Contacts</h1>
            </div>
            <div className='contacts__cards'>
                <ContactsCard addNewContact/>

                <ContactsCard/>
                
                <ContactsCard/>
                
                <ContactsCard/>

            </div>
        </div>
    )
}
