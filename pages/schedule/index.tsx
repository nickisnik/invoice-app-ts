import React, { useEffect, useState } from 'react'
import { startOfToday, format, eachDayOfInterval, addDays } from 'date-fns'
import styles from '../../styles/Schedule.module.css'


const Schedule = () => {
    const [days, setDays] = useState<any>(() => {
        const today = new Date()
        const end = addDays(today, 30)
        return (
            eachDayOfInterval({
                start: today,
                end: end
            })
        )
    })
    const users = ['Nick', 'Ben', 'Tim']
    useEffect(() => {
        console.log(days)
    }, [days])
  return (
    <div className={styles.container}>
       <div className={styles.table_wrapper}>
           <table className={styles.table}>
                <thead className={styles.headrow}>
                    <th className={styles.users_header}>Users</th>
                    {days?.map((day : any, index : number) => (
                        <th key={index} className={styles.headDay_wrapper}>
                            <div className={styles.headDay}>
                                <span className={styles.header_monthDate}>{format(day, 'LLL d')}</span>
                                <span className={styles.header_dayOfWeek}>{format(day, 'iii')}</span>
                            </div>
                        </th>
                    ))}
           
                </thead>
                <tbody>
                    {users.map((user, userIndex) => (
                        <tr>
                            <td className={styles.user_details}>{user}</td>
                            {days?.map((day : any, dayIndex : number) => (
                                <td className={styles.task_wrapper}>Task</td>
                            ))}
                        </tr>
                    ))}
                    
                    {/* {users?.map((user, userIndex) => (
                        {}
                    ))} */}
                </tbody>
           </table>
       </div>
    </div>
  )
}

export default Schedule