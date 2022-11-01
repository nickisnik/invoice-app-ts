import React, {useEffect, useRef, useState} from 'react'
import {format, parse, compareAsc} from 'date-fns' 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import styles from '../../styles/Shift.module.css'
import {InputLabel, TextField, Select, MenuItem, NativeSelect} from '@mui/material'
import type {User, Event} from '../schedule'
const Shift = ({selected, selectedUserId, setShowEditor, selectedTitle, handleSubmit, handleDateChange, users, startDate, endDate} : any) => {

  return (
    <form onSubmit={handleSubmit} action="" className={styles.addForm}>
              
                <input className={styles.title} ref={selectedTitle} type="text" placeholder="Add title" required />
                
                <select className={styles.userSelect} ref={selectedUserId} defaultValue={selected.id} name="users" id="users">
                    {users?.map((user : User, userIndex : number) => {
                        return (
                            <option key={userIndex} value={user.userId}>{user.name}</option>
                        )
                    })}
                </select>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        className={styles.datePicker}
                        label="Start time"
                        inputFormat="dd/MM/yyyy hh:mm a"
                        value={startDate}
                        onChange={(value) => handleDateChange(value, true)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DateTimePicker
                        className={styles.datePicker}
                        label="End time"
                        inputFormat="dd/MM/yyyy hh:mm a"
                        value={endDate}
                        onChange={(value) => handleDateChange(value, false)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <button className={styles.submit} type="submit">Save</button>
                <button className={styles.close} onClick={() => setShowEditor((prev : any) => !prev)}>Close</button>
           </form>
  )
}

export default Shift