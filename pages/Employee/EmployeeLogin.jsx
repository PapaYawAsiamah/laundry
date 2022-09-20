import React, { useState } from "react";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "../../styles/adminlogin.module.css";
import Navbar from "../../components/Navbar";

const EmployeeLogin = () => {
  const router = useRouter();
  const key = "WWSK5";
  const EmKey = "WWS";
  const [Password, setPassword] = useState();
  const [wrong, setWrong] = useState(false);
  const Login = (e) => {
    e.preventDefault();
    if (Password === key) {
      setWrong(false);
      Cookies.set("Emloggedin", true);
      router.push("./EmployeePage");
    } else if (Password === EmKey) {
      setWrong(false);
      Cookies.set("Emloggedin", true);
      router.push("./EmployeePage");
    } else {
      //  alert("wrong");

      setWrong(true);
    }
  };
  const Check = (a) => {
    setPassword(a);
    setWrong(false);
  };
  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <h4 className={styles.header}>Employee</h4>
      {wrong && <p style={{ color: "red" }}>wrong key</p>}
      <input
        type="password"
        className={styles.input}
        placeholder="enter key"
        onChange={(e) => Check(e.target.value)}
      />
      <div>
        <button onClick={(e) => Login(e)} className={styles.loginButton}>
          Login
        </button>
      </div>
    </div>
    </>
  );
};

export default EmployeeLogin;
