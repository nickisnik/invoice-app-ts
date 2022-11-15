import '../styles/globals.css'
import {useEffect, useState} from 'react'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { useStore } from '../utils/store';
import { auth, db } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from '../components/Loading';
import { updateDoc, doc, addDoc, getDoc, collection, setDoc } from 'firebase/firestore'
import Login from '../components/Login';
import BusinessList from '../components/BusinessList';
import type { AuthDetails } from '../utils/store';
import { async } from '@firebase/util';

function MyApp({ Component, pageProps }: AppProps) {
  const [authState, setAuthState] : [AuthDetails, any] = useStore(
    (state : any) => [state.authDetails, state.setAuthDetails]
  )
  const [selectedBusiness, setSelectedBusiness] = useStore(
    (state : any) => [state.selectedBusiness, state.setSelectedBusiness]
  )
  const [loading, setLoading] = useStore(
    (state : any) => [state.loading, state.setLoading]
  )
  const createNewUser = async (user : any) => {
    let newBusinessID = ""
    addDoc(collection(db, "businesses"), {
      name: "Demo"
    }).then((business) => {
      newBusinessID = business.id 
    }).then(() => {
      // Link the new user account to the business
      setDoc(doc(db, "users", user.uid), {
        businesses : [newBusinessID],
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        id: user.uid,
        loggedIn: true,
        anonymous: user.isAnonymous
      })
      // add logic to create a first demo event in events collection
    }).then(() => {
      setSelectedBusiness({id: newBusinessID, name: "Demo"})
      //console.log(newBusinessID)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }).catch((err) => console.log(err))
  }
  const handleAnonUser = async (user : any) => {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if(!userDoc.exists()) {
      console.log("User doesn't exist")
      // Create demo business 
      createNewUser(user)
    } else {
      setSelectedBusiness({id: userDoc.data().businesses[0], name: "Demo"})
      setLoading(false)
    }
  }
  const handleGoogleUser = async (user : any) => {
    const userRef = doc(db, "users", user.uid)
    const userDoc = await getDoc(userRef)
    if(userDoc.exists()) {
      updateDoc(userRef, {
        name: user.displayName,
        photoURL: user.photoURL
      })
    } else {
      // Create new user
      createNewUser(user)
    }

    // Update user name and photo from google
    // in case they changed since last time

  }
  useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if(user) {
        setLoading(true)
        //console.log(user)
				setAuthState({
					name: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					id: user.uid,
					loggedIn: true,
          anonymous: user.isAnonymous
				})
        if(!user.isAnonymous) {
          handleGoogleUser(user)
        }
        if(user.isAnonymous) {
          // Creates new user
          handleAnonUser(user)
          return
          //createAnonUser(user)
        }
        // Loading screen
        setTimeout(() => {
          setLoading(false)
        }, 1000)

			} else {
        setLoading(true)
				setAuthState({
          name: "",
					email: "",
					photoURL: "",
					id: "",
					loggedIn: false
        })
        setSelectedBusiness({name: "", id: ""})
        setTimeout(() => {
          setLoading(false)
        }, 1000)
			}

      
		})
    return () => unsubscribe()
	}, [])

  if(loading) {
    return (
      <div className='app'>
        <Loading />
      </div>
    )
  }
 
  if(!authState.loggedIn) {
    return (
      <div className='app'>
        <Login />
      </div>
    )
  }
  if(selectedBusiness.id === '') return (
    <div className='app'>
      {loading ? <Loading /> : ''}
      <BusinessList />
    </div>
  )

  return (
    <div className='app'>
      <Navbar />
      {loading ? <Loading /> : ''}
      <div className='component_wrapper'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
