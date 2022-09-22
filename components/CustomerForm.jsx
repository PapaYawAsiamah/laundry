import React, { useState } from "react";
import { TextField } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import CustomSnackbar from "./CustomSnackbar";

import ItemsForm from "./ItemsForms";

const CustomerForm = ({
  customers,
  handleClose,
  setOpen,
  open,
  setItemAdd,
  itemAdd,
  editId
}) => {
  const defaultValues = {
    name: "",
    number: "",
  };
  const [customer, setCustomer] = useState(defaultValues);


 //when adding item
 const defaultValuesOfItems = {
  item: "",
  quantity: "",
  description: "",
  price: "",
  date:  serverTimestamp(),
  index: Date.now()
};
const [items, setItems] = useState(defaultValuesOfItems );












  //snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");
  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  const addCustomer = async (e) => {
    e.preventDefault();
    if(!itemAdd){
    const customersRef = collection(db, "customers");

    await addDoc(customersRef, {
      ...customer,
      index: Date.now().toString(),
    })
      .then(() => {
        setOpen(false);
        setSnackbarMessage("customer added successfully");
        setSnackbarType("success");
        setOpenSnackbar(true);
      })
      .catch((e) => {
        console.log(e);
        setSnackbarMessage(e);
        setSnackbarType("error");
        setOpenSnackbar(true);
      });
    } else {
      const index = customers.findIndex((member) => member.id === editId);
      const membersRef = collection(db, "wash");
      await addDoc(
        membersRef, {
          name: customers[index].name,
          ...items
        }
      );
    }
  };

  return (
    <>
      <CustomSnackbar
        open={openSnackbar}
        handleClose={closeSnackbar}
        message={snackbarMessage}
        type={snackbarType}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>

       {!itemAdd && <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "60ch" },
            }}
          >
            <TextField
              required
              label="Name"
              margin="normal"
              value={customers.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
            />
            <TextField
              required
              type="number"
              label="phone"
              margin="normal"
              value={customers.number}
              onChange={(e) =>
                setCustomer({ ...customer, number: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        } 
        {
          itemAdd && <DialogContent>
            <ItemsForm items={items} setItems={setItems}/>
          </DialogContent>
        }
        <DialogActions>
          <Button onClick={addCustomer}>Add</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomerForm;
