import React from 'react';
import styles from "../styles/header.module.css";
import Link from "next/link";


const Nav = ({logout}) => {
  return (
    <div className={styles.navbar}>
    <div className={styles.navItems} >
    <button onClick={() => {logout()}} className={styles.dropbtn}>logout</button>
    <div className={styles.Link}>
    <Link href="/Employee/Wash">Items</Link>
    </div>
    
    </div>

    <div className={styles.logo}>
      <img src="/logo.jpg" alt="logo" className={styles.logoImage} />
    </div>
  </div>
  )
}

export default Nav