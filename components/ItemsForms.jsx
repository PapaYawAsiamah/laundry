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
} from "firebase/firestore";
import CustomSnackbar from "./CustomSnackbar";

const ItemsForm = ({items, setItems }) => {
  

 
  

  return (
    <>
      
          <Box
            noValidate
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "60ch" },
            }}
          >
            <TextField
              required
              label="Enter Item"
              margin="normal"
            //   value={customers.name}
              onChange={(e) =>
                setItems({ ...items, item: e.target.value })
              }
            />
            <TextField
              required
              type="number"
              label="quantity"
              margin="normal"
            //   value={customers.number}
              onChange={(e) =>
                setItems({ ...items,  quantity: e.target.value })
              }
            />
            <TextField
              required
              
              label="description"
              margin="normal"
            //   value={customers.number}
              onChange={(e) =>
                setItems({ ...items,  description: e.target.value })
              }
            />
             <TextField
              required
              type="number"
              label="total price"
              margin="normal"
            //   value={customers.number}
              onChange={(e) =>
                setItems({ ...items,  price: e.target.value })
              }
            />
          </Box>
       
    </>
  );
};

export default ItemsForm;
