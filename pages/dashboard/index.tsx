import React, { useState, useEffect } from 'react'
import {db, signInWithGoogle} from '../../utils/firebase-config'
import {collection, onSnapshot, doc, getDocs, addDoc, updateDoc, deleteDoc} from 'firebase/firestore'
import { useStore } from '../../utils/store'
import shallow from 'zustand/shallow'
const Dashboard = () => {
  const [users, setUsers] = useState<any>()
  const usersCollectionRef = collection(db, "users")
  const [name, setName] = useState<string>()
  const [color, setColor] = useState<string>()
  const eventsCollectionRef = collection(db, "businesses", "Nick's restaurant", "events")
  const [authState, setAuthState] = useStore(
    (state : any) => [state.authDetails, state.setAuthDetails])

  useEffect(() => {
    getDocs(eventsCollectionRef).then((data : any) => {
      console.log(data.docs.map((doc : any) => ({...doc.data()})))
    }).catch((err) => console.log(err))

    //
    onSnapshot(usersCollectionRef, (data : any) => {
      setUsers(data.docs.map((doc : any) => ({...doc.data(), id: doc.id})))
    })
  }, [])


  const updateUser = (id : string) => {
    const userDoc = doc(db, "users", id)
    updateDoc(userDoc, {age: 22})
      .then(() => alert('Updated!'))
  }
  const deleteUser = (id : string) => {
    const userDoc = doc(db, "users", id)
    deleteDoc(userDoc)
  }
  const createUser = (e : any) => {
    e.preventDefault()
    addDoc(usersCollectionRef, {name: name, color: color})
  }


  const signIn = () => {
    signInWithGoogle().then((result) => {
      console.log(result.user.email)
      setAuthState({
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        id: result.user.uid,
        loggedIn: true
      })
    }).catch((err) => console.log(err))
  }

  return (
    <div>
      {users?.map((user : any, index : number) => (
        <div key={index}>
          <span>{user.name} likes {user.color}{user.age? ", age: " + user.age : ''}</span>
          <button onClick={() => updateUser(user.id)}>Add age</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
      <form onSubmit={(e : any) => createUser(e)}>
        <h4>Add new user...</h4>
        <input type="text" placeholder='Name...' onChange={(e : any) => setName(e.target.value)} />
        <input type="text" placeholder='Color...' onChange={(e : any) => setColor(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <p>Auth state: {authState.loggedIn ? 'In' : 'No'}</p>
      <p>Name: {authState.name}, Email: {authState.email}</p>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  )
}

export default Dashboard