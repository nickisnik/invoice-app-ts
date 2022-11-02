import React, {useState, useEffect} from 'react'
import { format } from 'date-fns';
import styles from '../styles/Schedule.module.css'
import type { Event, User } from './schedule';
const UserEvents = ({currentDay, currentDayIndex, user, toggleEditor} : any) => {
    useEffect(() => {
    }, [])
    const currentDate = format(currentDay, 'dd/MM/yyyy');
    const eventsToday = user.events?.filter((userEvent : Event) => (
        format(Date.parse(userEvent.timeStart), 'dd/MM/yyyy') === currentDate
        ))
    const shiftFirst = (a : Event, b : Event) => {
        if(a.type === 'Shift' && b.type === "Note") {
            return -1
        }
        if(a.type === 'Note' && b.type === "Shift") {
            return 1
        }
        return 0
    }
    
    return (
        <div key={currentDayIndex} className={styles.task_wrapper}>
            {eventsToday?.sort((a:Event,b:Event) => shiftFirst(a,b))
            .map((userEvent : Event, eventIndex : number) => (
                <UserEvent key={eventIndex} user={user} eventsToday={eventsToday} userEvent={userEvent} eventIndex={eventIndex} />
            ))}
            {eventsToday[0]?.type !== 'Off' && <div onClick={() => toggleEditor(user.userId, user.name, currentDay)} className={styles.empty_event}>
                <span>+</span>
            </div>}
        </div>
    )
}

type EventProps = {
    eventsToday : Event[],
    userEvent: Event,
    eventIndex: number,
    user: User
} 

export const UserEvent = ({user, eventsToday, eventIndex, userEvent} : EventProps) => {
    const start = format(Date.parse(userEvent.timeStart), 'H:mm')
    const end = format(Date.parse(userEvent.timeEnd), 'H:mm')
    if(eventIndex === 2 && eventsToday.length > 3) {
       return <></>
    }
    if(eventIndex === 3) return (
       <span key={eventIndex} className={styles.event_overflow}>+ {eventsToday.length - 2} more</span>
    )
    if(eventIndex > 3) return <></>

    if(userEvent.type === 'Shift') {
        
        //const eventStart = formatDate.parse(userEvent.timeStart)
        return (
            <div key={eventIndex} style={{backgroundColor: user.color}} className={styles.task}>
                <span className={styles.time}>{start} - {end}</span>
                <span className={styles.event_name}>{userEvent.name}</span>
            </div>
        )
    }
    if(userEvent.type === 'Note') {
        return (
            <div key={eventIndex} style={{backgroundColor: user.color}} className={styles.task}>
                <span className={`${styles.event_name} ${styles.note}`}>{userEvent.name}</span>
            </div>
        )
    }
    if(userEvent.type === 'Off') {
        return (
            <div key={eventIndex} style={{backgroundColor: user.color}} className={`${styles.task} ${styles.time_off}`}>
                <span className={styles.off_title}>Time off</span>
                <span className={styles.off_reason}>{userEvent.name}</span>
            </div>
        )
    }
    return (
        <></>
    )
    
    
}

export default UserEvents