import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context";
import WashNav from "../../components/WashNav";
import { DataGrid } from "@mui/x-data-grid";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "react-datepicker";
import { TextField } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";

const Wash = () => {
  const { customers, wash } = useContext(AppContext);
  const [find, setFind] = useState("");
  const [filtered, setFiltered] = useState([]);
  const columns = [
    {
      field: "name",
      headerName: "name",
      width: 350,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "phone",
      width: 200,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "date",
      headerName: "date",
      width: 200,
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
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "price",
      width: 300,
      headerAlign: "center",
      align: "center",
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
  }, [find, customers]);

  return (
    <>
      <WashNav />
       
      <TextField
          label="Search"
          variant="standard"
          sx={{ width: "60ch", marginLeft: 2, marginTop:10 }}
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
