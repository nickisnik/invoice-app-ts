import React from 'react'
import styles from '../styles/Editor.module.css'

const InvoiceEditor = ({invoice, setInvoice, setEditMode}) => {
 
    return (
    <div className={styles.container}>
        <section className={styles.edit_wrapper}>
            <header className={styles.header}>Edit #{invoice.id}</header>
            <form className={styles.edit_form}>
                <label className={styles.label} htmlFor="fromStreet">Street Address</label>
                <input type="text" name='fromStreet' className={styles.input} />
                <label className={styles.label} htmlFor="clientName">Client's Name</label>
                <input type="text" name='clientName' className={styles.input} />
                <label className={styles.label} htmlFor="clientEmail">Client's Email</label>
                <input type="text" name='clientEmail' className={styles.input} />
                <label className={styles.label} htmlFor="toStreet">Street Address (Receiver)</label>
                <input type="text" name='toStreet' className={styles.input} />
                <label className={styles.label} htmlFor="projectName">Project Name</label>
                <input type="text" name='projectName' className={styles.input} />

            </form>
        </section>


        <div className={styles.overlay} onClick={() => setEditMode(false)}></div>
    </div>
  )
}

export default InvoiceEditor