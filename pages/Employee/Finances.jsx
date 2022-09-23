import React, { useContext, useEffect, useState } from "react";
import Fnav from "../../components/Fnav";
import { DataGrid } from "@mui/x-data-grid";
import AppContext from "../../context";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AlertDialog from "../../components/AlertDialog";
import { db } from "../../firebase";
import { doc,addDoc, collection,serverTimestamp, } from "firebase/firestore";
import CustomSnackbar from "../../components/CustomSnackbar";
import Button from "@mui/material/Button";

const Finances = () => {
  const { amounts, customers, paid } = useContext(AppContext);
  const [history, setHistory] = useState(false)
const [hisTotal, setHisTotal] =useState()
//snackbar
const [openSnackbar, setOpenSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");
const [snackbarType, setSnackbarType] = useState("error");
const closeSnackbar = () => {
  setOpenSnackbar(false);
};




  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editID, setEditID] = useState();
 
  const columns = [
    { field: "name", headerName: "name", width: 400 },
    { field: "phone", headerName: "Phone number", width: 330 },
    { field: "createdAt", headerName: "Date", width: 330 },
    { field: "amount", headerName: "amount", width: 330 },
  ];
  
  //loading option
  const [Coptions, setCoptions] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [total, setTotal] = useState();


  useEffect(() => {
    if (customers.length > 0) {
      setCoptions([]);
      customers.forEach((data) => {
        setCoptions((Coptions) => [
          ...Coptions,
          {
            label: data.name,
            id: data.index,
          },
        ]);
      });
    }

    //filterind data
    if (selectedCustomer) {
      const filteredData = amounts.filter(
        (val) => val.index === selectedCustomer.id
      );

      if (filteredData) {
        setCustomerData(filteredData);
      } else setCustomerData(amounts);

      setEditID(selectedCustomer.id)

    }
  }, [amounts, selectedCustomer]);
  
  
  useEffect(() => {
    if (customerData) {
      const arr = customerData.map((customer) => ({
        amount: customer.amount,
      }));

      setTotal(
        arr.reduce((accumulator, object) => {
          return accumulator + object.amount;
        }, 0)
      );
    }

    if(filteredHis){
        const arr = filteredHis.map((customer) => ({
            amount: customer.amount,
          }));

          setHisTotal(
            arr.reduce((accumulator, object) => {
              return accumulator + object.amount;
            }, 0)
          );
    }

    
  });
//filtering History
const [filteredHis, setFilteredHis] = useState([]);
  const selectCustomer = (val) => {
    setSelectedCustomer(val);
    setHistory(false)
    //summing up
  };
//making payment
const closeAlertDialog = () => {
    setTriggerDialog(false);
  };
const [triggerDialog, setTriggerDialog] = useState(false);
const [alertMessage, setAlertMessage] = useState("");
const [credit, setCreit] = useState()
  const makePay = () => {
    setAlertMessage("confirm payment");

    setTriggerDialog(true);
  }

  const confirmPay = async () =>{
    const historyRef = collection(db, "paid");
    const index = customers.findIndex((member) => member.index === editID);
    await addDoc(historyRef, {
        name: customers[index].name,
        phone: customers[index].number,
        createdAt: serverTimestamp(),
        index: customers[index].index,
        amount: credit,
        id: Date.now()
      }).then((res) => {
        closeAlertDialog();
      }) .then(() => {
       
        setSnackbarMessage("payment successfully");
        setSnackbarType("success");
        setOpenSnackbar(true);
      });

    // console.log(customers[index])
  }
const openHistory = () => {
    setHistory(true);
    if (selectedCustomer) {
        const filteredData = paid.filter(
          (val) => val.index === selectedCustomer.id
        );
  
        if (filteredData) {
            setFilteredHis(filteredData);
        } else setFilteredHis([]);
    }
}
  
 

  return (
    <>
      <Fnav />
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
        action={confirmPay}
      ></AlertDialog>
      <div style={{ marginTop: 100 }}>
        <Autocomplete
          sx={{ width: 300 }}
          id="auto-complete"
          options={
            Coptions.length > 0 ? Coptions : [{ label: "Loading...", id: 0 }]
          }
          getOptionLabel={(option) => (option.label ? option.label : "")}
          isOptionEqualToValue={(opt, val) => opt.id === val.id}
          value={selectedCustomer}
          onChange={(e, val) => selectCustomer(val)}
          // onInputChange={(val) => setSelectedStudentId(val)}
          renderInput={(params) => (
            <TextField {...params} label="Select Customer" />
          )}
        />
      </div>
      <div style={{ height: 500, width: "100%", marginTop: 20 }}>
        <DataGrid
          rows={customerData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoPageSize
          disableSelectionOnClick
        />
      </div>
      <div style={{display: "flex"}}>
        <h1 style={{color:"green"}}>total: {total}</h1>
        <h1 style={{marginLeft:100, color:"red"}}>amount left: {history && total - hisTotal}</h1>
        
        {selectedCustomer && 
        <div style={{display: "flex"}}>
              <input style={{height: 30, marginTop:30, marginLeft:100}} type="number" onChange={(e) => setCreit(Number(e.target.value))}></input>
              <Button  variant="contained" sx={{height:30,
               marginTop:4, marginLeft:2, }} onClick={makePay}>Pay</Button>
        </div>
      
        }
          <Button variant="contained" sx={{marginLeft:50, height:30, marginTop:4, }} onClick={openHistory}>History</Button>
      </div>

      {history && <div style={{ height: 500, width: "100%", marginTop: 20 }}>
        <DataGrid
          rows={filteredHis}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoPageSize
          disableSelectionOnClick
        />
      </div>}
    </>
  );
};

export default Finances;
