import React from "react";
import Link from "next/dist/client/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import styles from "../../styles/adminpage.module.css"
import Nav from "../../components/Nav";

const AdminPage = () => {
  const router = useRouter();
  const logout = () => {
    Cookies.remove("loggedin");
    router.push("./AdminLogin");
  };
  return (
    <>
    {/* <Nav/> */}
    <div className={styles.test}>
      <h1>AdminPage</h1>
      <button
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>
    </div>
    </>
  );
};

export default AdminPage;
