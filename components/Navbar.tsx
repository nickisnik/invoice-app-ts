import React from 'react'
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'
import { useStore } from '../utils/store';
import NavUserProfile from './NavUserProfile';

const Navbar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [selectedBusiness, setSelectedBusiness] = useStore(
    (state : any) => [state.selectedBusiness, state.setSelectedBusiness]
  )

  return (
    <nav className={styles.container}>
      <span className={styles.logo}>Shiftly</span>
      <span className={styles.business_name}>{selectedBusiness.name}</span>
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
      <NavUserProfile/>
    </nav>
  )
}

export default Navbar