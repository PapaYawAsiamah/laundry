import React,  { useContext } from 'react';
import AppContext from "../../context";
import WashNav from '../../components/WashNav';
import { DataGrid } from "@mui/x-data-grid";

const Wash = () => {
    const { customers, wash } = useContext(AppContext);
    const columns = [
        { field: "name", headerName: "name", width: 400 },
        
        {
            field: "date",
            headerName: "date",
            width: 300,
          },
          
        {
            field: "item",
            headerName: "item",
            width: 300,
          },
          {
            field: "quantity",
            headerName: "quantity",
            width: 300,
          },
        {
            field: "description",
            headerName: "desc",
            width: 300,
          },
        {
            field: "price",
            headerName: "price",
            width: 300,
          },
        

    
    ]

  return (
    <>
    <WashNav/>
    <div style={{ height: 500, width: "100%", marginTop: 70 }}>
        <DataGrid
         
          rows={wash}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoPageSize
          disableSelectionOnClick
        />
      </div>
    </>
  )
}

export default Wash