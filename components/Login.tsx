import React from 'react'
import styles from '../styles/Login.module.css'
import { signInAnon, signInWithGoogle } from '../utils/firebase-config'

const Login = () => {

  return (
    <div className={styles.wrapper}>
        <span className={styles.shiftly}>Shiftly</span>
        <div className={styles.login_form}>
            <span className={styles.title}>Login here 👋🏻</span>
            <div className={styles.login_buttons}>
                <button onClick={signInWithGoogle} className={styles.btn}>Google</button>
                <button onClick={signInAnon} className={styles.btn}>Demo (guest)</button>
            </div>
        </div>
    </div>
  )
}

export default Login