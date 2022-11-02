import React, {useEffect} from 'react'
import styles from '../styles/Navbar.module.css'
import { useStore } from '../utils/store';
import { auth, signInWithGoogle } from '../utils/firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const NavUserProfile = () => {
	const [authState, setAuthState] = useStore(
			(state : any) => [state.authDetails, state.setAuthDetails]
	)
	const signIn = () => {
    signInWithGoogle().then((result) => {
      // console.log(result.user.email)
      // setAuthState({
      //   name: result.user.displayName,
      //   email: result.user.email,
      //   photoURL: result.user.photoURL,
      //   id: result.user.uid,
      //   loggedIn: true
      // })
    }).catch((err) => console.log(err))
  }

	if(!authState.loggedIn) return (
		<button className={styles.login} onClick={signIn}>Log in</button>
	)
  return (
    <div className={styles.account}>
        <div className={styles.profile_wrapper}><img src={authState.photoURL} alt={authState.name} /></div>
        <button className={styles.logout} onClick={() => signOut(auth)}>Logout</button>
    </div>
  )
}

export default NavUserProfile