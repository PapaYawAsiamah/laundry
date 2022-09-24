import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context";
import WashNav from "../../components/WashNav";
import { DataGrid } from "@mui/x-data-grid";
import Autocomplete from "@mui/material/Autocomplete";

import { TextField, IconButton } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import AlertDialog from "../../components/AlertDialog";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import CustomSnackbar from "../../components/CustomSnackbar";
const Wash = () => {
  const { customers, wash } = useContext(AppContext);
  const [find, setFind] = useState("");
  const [filtered, setFiltered] = useState([]);
 

  //checkout
  const [selectedItemID, setSelectedItemID] = useState();
  const [triggerDialog, setTriggerDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [checkout, setCheckout] = useState(false);
  //snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");
  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };
  const closeAlertDialog = () => {
    setTriggerDialog(false);
  
  };
  const deleteItem = async (docId) => {
  
    setCheckout(true);
    setSelectedItemID(docId);
    setAlertMessage("checkout cannot be undone");

    setTriggerDialog(true);
  };


  const confirmDelete = async () => {
    const docRef = doc(db, "wash", selectedItemID);

    await deleteDoc(docRef)
      .then((res) => {
        closeAlertDialog();
        setSnackbarMessage("checked out");
        setSnackbarType("success");
        setOpenSnackbar(true);
        
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const columns = [
    {
      field: "name",
      headerName: "name",
      width: 310,
    },
    {
      field: "phone",
      headerName: "phone",
      width: 150,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "createdAt",
      headerName: "date",
      width: 150,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "item",
      headerName: "item",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "quantity",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "desc",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "price",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "checkout",

      hideable: false,
      width: 90,
      renderCell: (cellValues) => {
        return (
          <>
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={(e) => deleteItem(cellValues.id)}
            >
              <CheckIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    setFiltered(
      wash.filter((user) =>
        user.name.toLowerCase().includes(find.toLocaleLowerCase())
      )
      //  setStudents(filtered)
      // console.log(filtered)
    );
  }, [find,wash ]);

  return (
    <>
      <WashNav />
      <CustomSnackbar
        open={openSnackbar}
        handleClose={closeSnackbar}
        message={snackbarMessage}
        type={snackbarType}
      />
      <AlertDialog
        triggerDialog={triggerDialog}
        handleClose={closeAlertDialog}
        message={alertMessage}
        action={confirmDelete}
      ></AlertDialog>
      <TextField
        label="Search"
        variant="standard"
        sx={{ width: "60ch", marginLeft: 2, marginTop: 10 }}
        onChange={(e) => {
          setFind(e.target.value);
        }}
        value={find}
      />

     <div style={{ height: 500, width: "100%", marginTop: 10 }}>
        <DataGrid
          rows={filtered}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoPageSize
          disableSelectionOnClick
        />
      </div>
      
    </>
  );
};

export default Wash;
