import React, {useEffect, useRef, useState} from 'react'
import {format, parse, compareAsc} from 'date-fns' 
import styles from '../../styles/AddEvent.module.css'
import {InputLabel, TextField, Select, MenuItem, NativeSelect} from '@mui/material'
import type {User, Event} from '../schedule'
import Shift from './Shift';
import Note from './Note';
import Off from './Off';
import { db } from '../../utils/firebase-config';
import { collection, addDoc, Timestamp } from 'firebase/firestore'
const AddEvent = ({users, setSelected, setUsers, days, setShowEditor, selected} : any) => {
    const handleSubmit = (e : any) => {
        e.preventDefault()
        const eventsCollectionRef = collection(db, "businesses", "Nick's restaurant", "events")
        const title = selectedTitle.current.value
        const newEvent =  {   
            user_id: selected.id,
            name: title,
            type: eventType,
            timeStart: Timestamp.fromDate(startDate),
            timeEnd: Timestamp.fromDate(endDate) // will need to change!
        }
        addDoc(eventsCollectionRef, newEvent)
        .catch(err => console.log(err))
        setShowEditor(false)
    }
    const selectedUserId = useRef<any>(selected.id)
    const selectedTitle = useRef<any>()
    const [eventType, setEventType] = useState<any>(
        'Shift' // OR 'Task' OR 'Note'
        )
    // Date 
    const [startDate, setStartDate] = useState<any>(
        selected.date
    );
    const [endDate, setEndDate] = useState<any>(
        selected.date
    );
    const handleDateChange = (newValue: any | null, start = true) => {
        
        if(start) {
            if(compareAsc(newValue, endDate) === 1) {
                // If new start date is after end date, match them
                setEndDate(newValue)
            }
            setStartDate(newValue)
        } else {
            if(compareAsc(startDate, newValue) === 1) {
                setStartDate(newValue)
            }
            setEndDate(newValue)
        }
      };
    const handleOutsideClick = (e : any) => {
        if(e.target === e.currentTarget) {
            setShowEditor(false)
        }
    }
  return (
    <div className={styles.overlay} onClick={handleOutsideClick}>
        <div className={styles.wrapper}>
        <section className={styles.selector_wrapper}>
            <div className={`${styles.selector_item} ${eventType==='Shift' && styles.active}`} onClick={() => setEventType('Shift')}>Shift</div>
            <div className={`${styles.selector_item} ${eventType==='Task' && styles.active}`} onClick={() => setEventType('Task')}>Task</div>
            <div className={`${styles.selector_item} ${eventType==='Note' && styles.active}`} onClick={() => setEventType('Note')}>Note</div>
            <div className={`${styles.selector_item} ${eventType==='Off' && styles.active}`} onClick={() => setEventType('Off')}>Off</div>
        </section>
        {eventType === 'Shift' ?
        <Shift selected={selected} selectedTitle={selectedTitle} setShowEditor={setShowEditor} selectedUserId={selectedUserId} handleSubmit={handleSubmit} handleDateChange={handleDateChange} users={users} startDate={startDate} endDate={endDate} /> :
        eventType === 'Task' ? <></> :
        eventType === 'Note' ? <Note selected={selected} selectedTitle={selectedTitle} setShowEditor={setShowEditor} selectedUserId={selectedUserId} handleSubmit={handleSubmit} handleDateChange={handleDateChange} users={users} startDate={startDate} /> :
        eventType === 'Off' ? <Off selected={selected} selectedTitle={selectedTitle} setShowEditor={setShowEditor} selectedUserId={selectedUserId} handleSubmit={handleSubmit} handleDateChange={handleDateChange} users={users} startDate={startDate} /> :
        <></>}
            
        </div>
    </div>
  )
}

export default AddEvent