import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Invoices.module.css'
import json from '../../components/data.json'
import formatCurrency from '../../utils/formatCurrency'


const Invoices = () => {
  const [data, setData] = useState<any>(null)
  const [sort, setSort] = useState('status')
  
  useEffect(() => {
    setData(json.data)
  }, [])

  const statusColor = (status : string) => {
    if (status === 'Paid') {
      return styles.paid
    }
    if(status === 'Pending') {
      return styles.pending
    }
    if(status === 'Draft') {
      return styles.draft
    }
  }
  const sortInvoices = () => {
    if(sort === 'status') {
      // sort by status
      const newData = [...data].sort((a:any, b:any) => {
        if(a.status === 'Paid') {
          if(b.status === 'Paid') return 0
          return 1
        }
        if(a.status === 'Pending') {
          if(b.status === 'Pending') return 0
          if(b.status === 'Paid') return -1
          if(b.status === 'Draft') return -1
        }
        if(a.status === 'Draft') {
          if(b.status === 'Paid') return -1
          if(b.status === 'Draft') return 0
          if(b.status === 'Pending') return 1
        }
        return 0
      })
      setData(newData)
      setSort('date')
    }
    if(sort === 'date') {
      // Code here
      setSort('status')
    }
  }


  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <header className={styles.header}>
          <section className={styles.title_container}>
            <h2 className={styles.title}>Invoices</h2>
            <h4 className={styles.subtitle}>There are {data?.length} invoices total</h4>
          </section>
          <section className={styles.controls}>
            <span onClick={sortInvoices} className={styles.filter}>Sort by {sort}</span>
            <button className={styles.new}>New invoice</button>
          </section>
        </header>
        <table className={styles.list}>
          <tbody>
            {data && data.map((item : any, index : number) => {
              return (
                <Link href={`/invoices/${item.id}`}>
                  <tr key={index} className={`${styles.invoice_item} ${statusColor(item.status)}`}>
                    <td className={styles.item_id}><span>#</span>{item.id}</td>
                    <td className={styles.item_date}>Due {item.date}</td>
                    <td className={styles.item_name}>{item.name}</td>
                    <td className={styles.item_amount}>{formatCurrency(item.amount)}</td>
                    <td className={`${styles.item_status} ${statusColor(item.status)}`}><span>{item.status}</span></td>
                  </tr>
                </Link>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default Invoices
