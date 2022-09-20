import React, { useState } from "react";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import styles from "../../styles/adminlogin.module.css";

const AdminLogin = () => {
    const router = useRouter();
  const key = "WWSK5";
  const [Password, setPassword] = useState();
  const [wrong, setWrong] = useState(false);
  const Login = (e) => {
    e.preventDefault();
    if (Password === key) {
      setWrong(false);
      Cookies.set("loggedin", true);
      router.push("./AdminPage");
    } else {
      //  alert("wrong");

      setWrong(true);
    }
  };
 const Check = (a) => {
   setPassword(a);
   setWrong(false)

 }

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <h4 className={styles.header}>Admin</h4>
      {wrong && <p style={{ color: "red" }}>wrong key</p>}
      <input type="password" className={styles.input} placeholder="enter key" onChange={(e) => Check(e.target.value)}/>
      <div>
      <button onClick={(e) => Login(e)} className={styles.loginButton}>Login</button>
      </div>
      
    </div>
    </>
  );
};

export default AdminLogin;
