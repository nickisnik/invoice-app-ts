import { format } from 'date-fns'
import React, { useEffect } from 'react'
import styles from '../../styles/Shift.module.css'
import { User } from '../schedule'
const Off = ({selected, selectedUserId, setShowEditor, selectedTitle, handleSubmit, handleDateChange, users, startDate, endDate} : any) => {
  
    useEffect(() => {
       console.log(startDate.toString())
    }, [])
    return (
    <form onSubmit={handleSubmit} className={styles.addForm}>
       {/*  <span className={styles.off_date}>{format(startDate, 'EEEE - dd/MM/yy')}</span> */}
        <textarea ref={selectedTitle} placeholder='Reason for time off...' required className={styles.note} />
        <select className={styles.userSelect} ref={selectedUserId} defaultValue={selected.id} name="users" id="users">
                    {users?.map((user : User, userIndex : number) => {
                        return (
                            <option key={userIndex} value={user.id}>{user.name}</option>
                        )
                    })}
                </select>
        <button type="submit" className={styles.submit}>Save</button>
        <button onClick={() => setShowEditor(false)} className={styles.close}>Cancel</button>
    </form>
  )
}

export default Off
