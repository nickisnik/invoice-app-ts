import React, {useEffect} from 'react'
import type Event from './schedule'
import styles from '../styles/EventDetails.module.css'
import format from 'date-fns/format'
import { db } from '../utils/firebase-config'
import { deleteDoc, doc } from 'firebase/firestore'
import { useStore } from '../utils/store'

const EventDetails = ({setShowDetails, selected} : any) => {
	const selectedBusiness = useStore(
		(state : any) => state.selectedBusiness
	)
    const userEvent = selected.current.eventDetails
		const deleteEvent = () => {
			setShowDetails(false)
			const docRef = doc(db, "businesses", selectedBusiness.id, "events", userEvent.id)
			deleteDoc(docRef)
		}
		//const formattedTime = [format(userEvent.timeStart, '')]
  return (
    <div className={styles.wrapper}>
				<div className={styles.overlay} onClick={() => setShowDetails(false)}></div>
      	<div className={styles.window_container}>
					<header className={styles.details_header}>
						<span className={styles.details_title}>{userEvent.type}</span>
						{userEvent.type === 'Shift' && 
							<span className={styles.title_date}> {format(new Date(userEvent.timeStart.seconds*1000), 'EEE, dd')}</span>
						}
					</header>
					<body className={styles.details_body}>
						<span className={styles.event_name}>{userEvent.name}</span>
						<div className={styles.controls}>
							<button onClick={deleteEvent} className={styles.delete}>Delete</button>
							{/* <button className={styles.edit}>Edit</button> */}
						</div>
					</body>
				</div>
    </div>
  )
}

export default EventDetails