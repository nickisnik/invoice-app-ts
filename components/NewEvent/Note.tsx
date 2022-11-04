import React from 'react'
import styles from '../../styles/Shift.module.css'
import { User } from '../schedule'
const Note = ({selected, selectedUserId, setShowEditor, selectedTitle, handleSubmit, handleDateChange, users, startDate, endDate} : any) => {
  
    return (
    <form onSubmit={handleSubmit} className={styles.addForm}>
        <textarea ref={selectedTitle} placeholder='Note here...' required className={styles.note} />
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

export default Note
