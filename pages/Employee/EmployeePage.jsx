import React, { useContext } from "react";
import Link from "next/dist/client/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import styles from "../../styles/employeepage.module.css";
import Nav from "../../components/Nav";
import AppContext from "../../context";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import CustomerForm from "../../components/CustomerForm";

const EmployeePage = () => {


  //DIALOGUE
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //LOGOUT
  const router = useRouter();
  const logout = () => {
    Cookies.remove("Emloggedin");
    router.push("./EmployeeLogin");
  };

  const { customers } = useContext(AppContext);

  // console.log(customers);

  const columns = [
    { field: "name", headerName: "name", width: 400 },
    { field: "number", headerName: "Phone number", width: 330 },
  ];
  return (
    <>
      <Nav logout={logout} />
      <div style={{  marginTop: 100 }}>
        <Button variant="contained" sx={{margin:1,}}  onClick={handleClickOpen}>+ customer</Button>
        <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={customers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoPageSize
        />
        </div>
       
      </div>
    <CustomerForm  customers={customers} handleClose={handleClose} open={open} setOpen={setOpen}/>
    </>
  );
};

export default EmployeePage;
