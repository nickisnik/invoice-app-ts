import React, {useEffect, useState} from 'react'
import { collection, onSnapshot, getDoc, where, query, doc } from 'firebase/firestore'
import { db } from '../utils/firebase-config'
import { useStore } from '../utils/store'
import type { AuthDetails } from '../utils/store'
import styles from '../styles/BusinessList.module.css'

const BusinessList = () => {
    const [authState, setAuthState] : [AuthDetails, any] = useStore(
      (state : any) => [state.authDetails, state.setAuthDetails]
    )
		const [businessList, setBusinessList] = useState<any>([])
		const [selectedBusiness, setSelectedBusiness] = useStore(
			(state : any) => [state.selectedBusiness, state.setSelectedBusiness]
		)
		const setLoading = useStore(
			(state : any) => state.setLoading
		)
    useEffect(() => {
      if(authState.anonymous) return

      const userRef = doc(db, "users", authState.id)
      getDoc(userRef).then((data : any) => {
        let businessIdList = []
        businessIdList = data.data().businesses
				businessIdList.forEach((item : any, index : number) => {
					const businessRef = doc(db, "businesses", item)
					let tempBusinessList : any = []
					getDoc(businessRef).then((data : any) => {
						tempBusinessList.push({name: data.data().name, id: data.id})
						if(index === businessIdList.length - 1) {
							setBusinessList(tempBusinessList)
						}
					})
				})
      })
      
    }, [])
    const handleClick = (item : any) => {
			setLoading(true)
			setSelectedBusiness(item)
			setTimeout(() => setLoading(false), 500)
	}

    if(authState.anonymous) return (
        <div>Test calendar</div>
    )
  return (
    <div className={styles.wrapper}>
			<span>YOUR BUSINESSES:</span>
      <div className={styles.business_list}>
				{businessList.map((item : any, index : number) => (
								<button className={styles.btn} onClick={() => handleClick(item)} key={index}>{item.name}</button>
							))}
			</div>
    </div>
  )
}

export default BusinessList