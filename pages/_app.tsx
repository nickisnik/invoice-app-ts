import '../styles/globals.css'
import {useEffect, useState} from 'react'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { useStore } from '../utils/store';
import { auth, db } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from '../components/Loading';
import { updateDoc, doc } from 'firebase/firestore'

function MyApp({ Component, pageProps }: AppProps) {
  const [authState, setAuthState] = useStore(
    (state : any) => [state.authDetails, state.setAuthDetails]
  )
  const [authLoaded, setAuthLoaded] = useState(false)

  useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if(user) {
        setAuthLoaded(false)
				setAuthState({
					name: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					id: user.uid,
					loggedIn: true
				})
        const userDoc = doc(db, "users", user.uid)
        // Update user name and photo from google
        // in case they changed since last time
        updateDoc(userDoc, {
          name: user.displayName,
          photoURL: user.photoURL
        })
        // Loading screen
        setTimeout(() => {
          setAuthLoaded(true)
        }, 1000)

			} else {
        setAuthLoaded(false)
				setAuthState({
          name: "",
					email: "",
					photoURL: "",
					id: "",
					loggedIn: false
        })
        setTimeout(() => {
          setAuthLoaded(true)
        }, 1000)
			}

      
		})
    return () => unsubscribe()
	}, [])

  if(!authLoaded) {
    return (
      <div className='app'>
        <Loading />
      </div>
    )
  }
  return (
    <div className='app'>
      <Navbar />
      <div className='component_wrapper'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
