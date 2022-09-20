import React, { useState } from "react";
import { TextField } from "@mui/material";
import Dialog, {DialogProps} from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, IconButton} from '@mui/material';
import Button from "@mui/material/Button";
import { db } from "../firebase";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";

const CustomerForm = ({customers,  handleClose, setOpen, open }) => {
  const defaultValues = {
    name: "",
    number: "",
  };
  const [customer, setCustomer] = useState(defaultValues);

  const addCustomer = async(e) => {
     e.preventDefault();
     const customersRef = collection(db, "customers");

     await addDoc(customersRef, {
      ...customer,
      
     })
     setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>New Customer</DialogTitle>
    <DialogContent>
      <Box
        noValidate
        component='form'
        sx={{
          '& > :not(style)': {m: 1, width: '60ch'},
        }}
      >
    <TextField
        label="Name"
        margin="normal"
        value={customers.name}
        onChange={(e) =>
          setCustomer({ ...customer, name: e.target.value })
        }
      />
      <TextField
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
    <DialogActions>
    <Button onClick={addCustomer}>Add</Button>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
  );
};

export default CustomerForm;
