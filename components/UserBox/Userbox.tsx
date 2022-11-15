import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Userbox.module.css'
const Userbox = ({user} : any) => {
  return (
	<div className={styles.username_box}>
		<div className={styles.avatar_wrapper}>
			{user.photoURL ? <Image layout='fill' src={user.photoURL} alt="Profile" /> :
			<div className={styles.default_avatar}>
				<span className={styles.default_avatar_name}>{user.name[0]}</span>
			</div>}
			
		</div>
		<div className={styles.name_wrapper}>
				<span className={styles.user_name}>{user.name}</span>
				<span className={styles.user_position}>0 hrs/week</span>
		</div>
		{/* <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="451.847px" height="451.847px" viewBox="0 0 451.847 451.847" fill="currentColor"> <g> <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0 c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744 c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg> */}
	</div>
  )
}

export default Userbox