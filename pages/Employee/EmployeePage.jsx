import React, { useContext, useState, useEffect } from "react";
import Link from "next/dist/client/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import styles from "../../styles/employeepage.module.css";
import Nav from "../../components/Nav";
import AppContext from "../../context";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import CustomerForm from "../../components/CustomerForm";
import { TextField, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import AlertDialog from "../../components/AlertDialog";

const EmployeePage = () => {
  const { customers } = useContext(AppContext);
const [itemAdd, setItemAdd] = useState(false)
  //ALert Dialogue
  const [alertMessage, setAlertMessage] = useState("");
  const [seletedDocID, setseletedDocID] = useState(null);
  const [triggerDialog, setTriggerDialog] = useState(false);
  const closeAlertDialog = () => {
    setTriggerDialog(false);
  };
  //SEARCH
  const [find, setFind] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(
      customers.filter((user) =>
        user.name.toLowerCase().includes(find.toLocaleLowerCase())
      )
      //  setStudents(filtered)
      // console.log(filtered)
    );
  }, [find, customers]);

  //DIALOGUE
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setItemAdd(false)
  };

  //LOGOUT
  const router = useRouter();
  const logout = () => {
    Cookies.remove("Emloggedin");
    router.push("./EmployeeLogin");
  };

  //deleting customer
  const deleteCustomer = async (docId) => {
    setseletedDocID(docId);
    setAlertMessage(
      "You're about to delete this customer. Do you wish to proceed?"
    );
    setTriggerDialog(true);
  };
  const confirmDelete = async () => {
    const docRef = doc(db, "customers", seletedDocID);
    console.log(docRef);
    await deleteDoc(docRef)
      .then((res) => {
        closeAlertDialog();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [editId, setEditID] = useState(null)
const addItem = (docId) => {
setItemAdd(true);
 handleClickOpen();
setEditID(docId)
}
 

  const columns = [
    { field: "name", headerName: "name", width: 400 },
    { field: "number", headerName: "Phone number", width: 330 },
    {
      field: "action",
      headerName: "",
      width: 180,
      hideable: false,
      width: 180,
      renderCell: (cellValues) => {
        return (
          <>
            <IconButton aria-label="edit" color="primary"
           onClick={(e) => addItem(cellValues.id)}
            >
              <AddCircleOutlineIcon />
            </IconButton>

            <IconButton
              aria-label="delete"
              color="error"
              onClick={(e) => deleteCustomer(cellValues.id)}
            >
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Nav logout={logout} />
      {/* CUSTOM ALERT DIALOG */}
      <AlertDialog
        triggerDialog={triggerDialog}
        handleClose={closeAlertDialog}
        message={alertMessage}
        action={confirmDelete}
      ></AlertDialog>
      <div style={{ marginTop: 100 }}>
        <Button
          variant="contained"
          sx={{ margin: 1 }}
          onClick={handleClickOpen}
        >
          + customer
        </Button>
        <TextField
          label="Search"
          variant="standard"
          sx={{ width: "60ch", marginLeft: 20 }}
          onChange={(e) => {
            setFind(e.target.value);
          }}
          value={find}
        />
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={filtered}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoPageSize
            disableSelectionOnClick
          />
        </div>
      </div>
      <CustomerForm
        customers={customers}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        itemAdd={itemAdd}
        setItemAdd={setItemAdd}
        editId={editId}
      />
    </>
  );
};

export default EmployeePage;
