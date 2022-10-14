import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import json from '../../components/data.json'
import styles from '../../styles/Invoice.module.css'
import formatCurrency from '../../utils/formatCurrency'
import InvoiceEditor from '../../components/InvoiceEditor'
const Invoice = () => {
    const [invoice, setInvoice] = useState<any>(undefined)
    const [editMode, setEditMode] = useState(false)
    const router = useRouter()
    const { id } = router.query
    const data = json.data

    useEffect(() => {
        setInvoice(json.data.find(item => item.id === id))
    })
    useEffect(() => {
        if(!invoice) return
        const total = invoice.items?.reduce((sum : number, curr : any) => sum + parseInt(curr.amount) * parseInt(curr.price), 0)
        console.log(total)
    }, [invoice])
    const invoiceTotal = invoice ? invoice?.items?.reduce((sum : number, curr : any) => sum + parseInt(curr.amount) * parseInt(curr.price), 0) : 0 
    const invoiceStatusClass = invoice?.status === 'Paid' ? styles.paid
                                : invoice?.status === 'Pending' ? styles.pending
                                : invoice?.status === 'Draft' ? styles.draft : '';


    if(!invoice) return (
        <></>
    )
  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <h2 className={styles.id}>Invoice <span>#</span>{id}</h2>
            <div className={invoiceStatusClass}>{invoice.status}</div>
            <button className={styles.edit} onClick={() => setEditMode(true)}>Edit</button>
            <button className={styles.delete}>Delete</button>
            <button className={styles.mark}>Mark as paid</button>
        </header>

        <main className={styles.main}>
            <div className={styles.personal_details}>
                <section className={styles.name_section}>
                    <h3 className={styles.name}>{invoice.name}</h3>
                    <h4 className={styles.email}>{invoice.email}</h4>
                </section>
                <section className={styles.address}>
                    <p>{invoice.address.street}</p>
                    <p>{invoice.address.city}</p>
                    <p>{invoice.address.postcode}</p>
                    <p>{invoice.address.country}</p>
                </section>
            </div>
            <table className={styles.list}>
                <thead>
                    <tr className={styles.headrow}>
                        <th className={styles.th}>Name</th>
                        <th className={styles.th}>QTY</th>
                        <th className={styles.th}>Price</th>
                        <th className={styles.th}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice?.items?.map((item : any, index : number) => {
                        return (
                            <tr className={styles.item} key={index}>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
                                <td>{formatCurrency(item.price)}</td>
                                <td>{formatCurrency(Number(item.amount)*Number(item.price))}</td>
                            </tr>
                        )
                    })}
                    <tr className={styles.total_row}>
                        <td colSpan={2} className={styles.total}>Total:</td>
                        <td colSpan={2} className={styles.total_num}>{formatCurrency(invoiceTotal)}</td>
                    </tr>
                </tbody>
            </table>
        </main>
    </div>
  )
}

export default Invoice