import React from "react";
import styles from "../styles/header.module.css";
import Link from "next/link";


const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navItems}>
        <div className={styles.dropDown}>
          <button className={styles.dropbtn}>
            Login
            {/* <i className="fa fa-caret-down"></i> */}
          </button>
          <div className={styles.dropdownContent}>
            <Link href="/Admin/AdminLogin">Admin Login</Link>
            <Link href="/Employee/EmployeeLogin">Employee Login</Link>
          </div>
        </div>
        <div className={styles.Link}>
          <Link href="/">Home</Link>
        </div>
      </div>

      <div className={styles.logo}>
        <img src="/logo.jpg" alt="logo" className={styles.logoImage} />
      </div>
    </div>
  );
};

export default Navbar;
