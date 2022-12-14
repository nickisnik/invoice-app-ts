import React from 'react'
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <nav className={styles.container}>
      <span className={styles.logo}>Shiftly</span>
      <div className={styles.menu_wrapper}>
        <Link href="/dashboard">
          <a className={currentRoute === '/dashboard' ? `${styles.active} ${styles.menu_item}` : styles.menu_item}><DashboardIcon/><span>Dashboard</span></a>
        </Link>
        <Link href="/invoices">
          <a className={currentRoute === '/invoices' ? `${styles.active} ${styles.menu_item}` : styles.menu_item}><ReceiptLongIcon/><span>Invoices</span></a>
        </Link>
        <Link href="/schedule">
          <a className={currentRoute === '/schedule' ? `${styles.active} ${styles.menu_item}` : styles.menu_item}><EventNoteIcon /> <span>Schedule</span></a>
        </Link>
      </div>
      <div className={styles.account}>
        <div className={styles.profile_wrapper}><img src="/profile.jpeg" alt="" /></div>
        <span className={styles.logout}>Logout</span>
      </div>
    </nav>
  )
}

export default Navbar