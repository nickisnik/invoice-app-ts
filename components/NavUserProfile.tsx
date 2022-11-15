import React, {useEffect} from 'react'
import styles from '../styles/Navbar.module.css'
import { useStore } from '../utils/store';
import { auth, signInWithGoogle } from '../utils/firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Image from 'next/image';
import type { AuthDetails } from '../utils/store';

const NavUserProfile = () => {
	const [authState, setAuthState] : [AuthDetails, any] = useStore(
			(state : any) => [state.authDetails, state.setAuthDetails]
	)
  const setSelectedBusiness = useStore(
    (state : any) => state.setSelectedBusiness
  )
  const setLoading = useStore(
    (state : any) => state.setLoading
  )

	const signIn = () => {
    signInWithGoogle()
    .catch((err) => console.log(err))
  }
  const handleChangeBusiness = () => {
    setLoading(true)
    setSelectedBusiness({name: "", id: ""})
    setTimeout(() => setLoading(false), 500)
  }

	if(!authState.loggedIn) return (
		<button className={styles.login} onClick={signIn}>Log in</button>
	)
  return (
    <div className={styles.account}>
        {!authState.anonymous ? 
          <div className={styles.profile_wrapper}><Image layout='fill' src={authState.photoURL} alt={authState.name} /></div>
        : <div>Guest</div>}
        <button className={styles.logout} onClick={() => signOut(auth)}>Logout</button>
        {!authState.anonymous && <button className={styles.change_business} onClick={handleChangeBusiness}>Change business</button>}
    </div>
  )
}

export default NavUserProfile