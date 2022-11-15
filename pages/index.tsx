import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
const Home: NextPage = () => {


  return (
    <div className={styles.container}>
      <span>Welcome to Shiftly!</span>
      <Link href="/schedule"><a>Demo schedule</a></Link>
    </div>
  )
}

export default Home
