import React, { useEffect, useState, useRef } from 'react'
import { isToday, parse, subDays, startOfToday, format, eachDayOfInterval, addDays } from 'date-fns'
import styles from '../../styles/Schedule.module.css'
import usersData from '../../components/schedule'
import AddEvent from '../../components/NewEvent/AddEvent'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import type {User, Event} from '../../components/schedule'
import Head from 'next/head'
import UserEvents from '../../components/UserEvents'
import { db } from '../../utils/firebase-config'
import { collection, onSnapshot, getDocs, where, query, addDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useStore } from '../../utils/store'
import type { AuthDetails } from '../../utils/store'
import EventDetails from '../../components/EventDetails'
import BusinessList from '../../components/BusinessList'
import Userbox from '../../components/UserBox/Userbox'

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
	const [selectedBusiness, setSelectedBusiness] = useStore(
		(state : any) => [state.selectedBusiness, state.setSelectedBusiness]
	)
	const [events, setEvents] = useState<Event[] | null>()
	useEffect(() => {
		if(!days) return
		if(!selectedBusiness) return
		const eventsCollectionRef = collection(db, "businesses", selectedBusiness.id, "events")
		const q = query(eventsCollectionRef, where('timeStart', '>', days[0]), where('timeStart', '<', days[6]))
		const unsubscribe = onSnapshot(q, (data: any) => {
			const event_data = data.docs.map((doc : any) => ({...doc.data(), id: doc.id}))
			setEvents(event_data)
		})
		return () => unsubscribe()
	}, [days])
	const [showDetails, setShowDetails] = useState(false)
	const [showEditor, setShowEditor] = useState(false)
	const [users, setUsers] = useState<User[]>();
	const selected = useRef<any>()
	useEffect(() => {
			if(!selectedBusiness.id) return
			// Next step is add possible filters for user queries
			const usersCollectionRef = collection(db, "users")
			const q = query(usersCollectionRef, where("businesses", "array-contains", selectedBusiness.id))
			const unsubscribe = onSnapshot(q, (data : any) => {
				const user_data = data.docs.map((doc : any) => ({...doc.data(), id: doc.id}))	
				setUsers(user_data)
				//console.log(user_data)
			})
			return () => unsubscribe()
	}, [])
	const toggleEditor = (userId : string, name: string, day : string) => {
			selected.current = {
					id: userId,
					name: name,
					date: day,
			}
			setShowEditor((prev) => !prev)
	} 
	const addUser = () => {
		// Add a demo user
		addDoc(collection(db, "users"), {
			businesses : [selectedBusiness.id],
			color: "rgb(100, 150, 200)",
			name: `Employee`	
		})
	}
	const authDetails : AuthDetails = useStore((state : any) => state.authDetails)
return (
	<div className={styles.page_container}>
			<Head>
					<title>Schedule</title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className={styles.wrapper}>
					<section className={styles.control_section}>
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
											<PersonAddAlt1Icon onClick={() => addUser()} className={styles.add_employee} />
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
												let user_events : Event[] | [] = [] ;
												if(events) {
													user_events = events.filter((event : Event) => event.user_id === user.id)
												}
													return (
													<div className={styles.events_row} key={userIndex}>
															<Userbox user={user} />
															{days?.map((currentDay : any, currentDayIndex : number) => (
																	<UserEvents setShowDetails={setShowDetails} selected={selected} user_events={user_events} key={currentDayIndex} currentDay={currentDay} currentDayIndex={currentDayIndex} user={user} toggleEditor={toggleEditor} />
															))}
													</div>)
	})}
							</main>
					</section>
			</div>
			{showDetails && <EventDetails selected={selected} setShowDetails={setShowDetails} />}
			{showEditor && <AddEvent selected={selected.current} setShowEditor={setShowEditor} users={users} days={days} setUsers={setUsers} />}
	</div>
)
}

export default Schedule