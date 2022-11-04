import React, {useEffect} from 'react'
import styles from '../styles/Navbar.module.css'
import { useStore } from '../utils/store';
import { auth, signInWithGoogle } from '../utils/firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Image from 'next/image';

const NavUserProfile = () => {
	const [authState, setAuthState] = useStore(
			(state : any) => [state.authDetails, state.setAuthDetails]
	)
  useEffect(() => {
    console.log(authState)
  }, [])
	const signIn = () => {
    signInWithGoogle()
    .catch((err) => console.log(err))
  }

	if(!authState.loggedIn) return (
		<button className={styles.login} onClick={signIn}>Log in</button>
	)
  return (
    <div className={styles.account}>
        <div className={styles.profile_wrapper}><Image layout='fill' src={authState.photoURL} alt={authState.name} /></div>
        <button className={styles.logout} onClick={() => signOut(auth)}>Logout</button>
    </div>
  )
}

export default NavUserProfile