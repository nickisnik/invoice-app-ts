import React from 'react'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.container}>

      <ul className={styles.menu}>
        <Link href={'/invoices'}>
          <li className={styles.menu_item}><span>Inv</span></li>
        </Link>
      </ul>

      <div className={styles.avatar_container}>
        <div className={styles.avatar}></div>
      </div>
    </nav>
  )
}

export default Navbar