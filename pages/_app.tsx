import '../styles/globals.css'
import {useEffect, useState} from 'react'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { useStore } from '../utils/store';
import { auth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from '../components/Loading';

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

  // function getValidatedUser() {
  //   return new Promise((resolve, reject) => {
  //     const unsubscribe = onAuthStateChanged(auth, (user) => {
  //           unsubscribe();
  //           resolve(user);
  //         },
  //         reject // pass up any errors attaching the listener
  //       );
  //   });
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
