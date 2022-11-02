import React from 'react'
import styles from '../styles/Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loading_wrapper}>
        <span className={styles.loading_logo}>Shiftly</span>
    </div>
  )
}

export default Loading