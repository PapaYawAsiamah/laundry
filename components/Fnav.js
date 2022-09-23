import React from 'react';
import styles from "../styles/header.module.css";
import Link from "next/link";


const Fnav = () => {
  return (
    <div className={styles.navbar}>
    <div className={styles.navItems} >
        <div className={styles.Link}>
        <Link href="/Employee/EmployeePage">Go Back</Link>
        </div>
  
    </div>

    <div className={styles.logo}>
      <img src="/logo.jpg" alt="logo" className={styles.logoImage} />
    </div>
  </div>
  )
}

export default Fnav