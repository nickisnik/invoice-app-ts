import React, { useEffect, useState, useRef } from 'react'
import { isToday, parse, subDays, startOfToday, format, eachDayOfInterval, addDays } from 'date-fns'
import styles from '../../styles/Schedule.module.css'
import usersData from '../../components/schedule'
import AddEvent from '../../components/NewEvent/AddEvent'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import type {User, Event} from '../../components/schedule'
import Head from 'next/head'
import UserEvents from '../../components/UserEvents'
const Schedule = () => {
    const [days, setDays] = useState<any>(() => {
        const today = new Date()
        const end = addDays(today, 6)
        return (
            eachDayOfInterval({
                start: today,
                end: end
            })
        )
    })

    const changeDays = (offset : number) => {
        const currentStartDate = days[0]
        const today = addDays(currentStartDate, offset)
        setDays(() => {
            const end = addDays(today, 6)
            return (
                eachDayOfInterval({
                    start: today,
                    end: end
                })
            )
        })

    }
    const [showEditor, setShowEditor] = useState(false)
    const [users, setUsers] = useState<User[]>();
    //const [selected, setSelected] = useState(['Name', 'Date'])
    const selected = useRef<any>()
    useEffect(() => {
        // Api call will be here
        setUsers(usersData)
    }, [])
    useEffect(() => {
        console.log(days)
    }, days)
    const toggleEditor = (userId : string, name: string, day : string) => {
        selected.current = {
            id: userId,
            name: name,
            date: day,
        }
        setShowEditor((prev) => !prev)
    } 
 
  return (
    <div className={styles.page_container}>
        <Head>
            <title>Schedule</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
       <div className={styles.wrapper}>
            <section className={styles.datecontrol_section}>
                <div className={styles.daterange_wrapper}>
                    <button onClick={() => changeDays(-7)} className={styles.arrow_left}>
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="451.847px" height="451.847px" viewBox="0 0 451.847 451.847" fill="currentColor"> <g> <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0 c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744 c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                    </button>
                    <span className={styles.daterange}>{format(days[0], 'LLL d')} - {format(days[6], 'LLL d, Y')}</span>
                    <button onClick={() => changeDays(7)} className={styles.arrow_right}>
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="451.847px" height="451.847px" viewBox="0 0 451.847 451.847" fill="currentColor"> <g> <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0 c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744 c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                    </button>

                </div>
            </section>

            <section className={styles.schedule}>
                <header className={styles.header}>
                    <div className={styles.header_employees}>
                        <button className={styles.employees_btn}>
                            <span>Employees</span>
                            <svg className={styles.arrow_down} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="451.847px" height="451.847px" viewBox="0 0 451.847 451.847" fill="currentColor"> <g> <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0 c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744 c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                        </button>
                        <PersonAddAlt1Icon className={styles.add_employee} />
                    </div>
                    {days?.map((day : any, index : number) => (
                        <div key={index} className={styles.header_day}>
                            <div className={`${styles.header_date__wrapper} ${isToday(day) && styles.today }`}>
                                <span className={styles.header_date}>{format(day, 'd')}</span>
                                <span className={styles.header_dayOfWeek}>{format(day, 'iii').toUpperCase()}</span>
                            </div>
                        </div>
                    ))}
                </header>
                <main className={styles.main}>
                        {users?.map((user : User, userIndex : number) => {
                            return (
                            <div className={styles.events_row} key={userIndex}>
                                <div style={{backgroundColor: user.color}} className={styles.username_box}>
                                    <div className={styles.avatar_wrapper}><img src="profile.jpeg" alt="Profile" /></div>
                                    <div className={styles.name_wrapper}>
                                        <span className={styles.user_name}>{user.name}</span>
                                        <span className={styles.user_position}>20h, {user.position}</span>
                                        <span className={styles.user_position}>0h/20h</span>
                                    </div>
                                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="451.847px" height="451.847px" viewBox="0 0 451.847 451.847" fill="currentColor"> <g> <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0 c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744 c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                                </div>
                                {days?.map((currentDay : any, currentDayIndex : number) => (
                                    <UserEvents key={currentDayIndex} currentDay={currentDay} currentDayIndex={currentDayIndex} user={user} toggleEditor={toggleEditor} />
                                ))}
                            </div>)
    })}
                </main>
            </section>
       </div>
       {showEditor && <AddEvent selected={selected.current} setShowEditor={setShowEditor} users={users} days={days} setUsers={setUsers} />}
    </div>
  )
}

export default Schedule