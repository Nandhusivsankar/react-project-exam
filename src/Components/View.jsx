import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button } from '@mui/material';
import Addstu from './Addstu';

const View = () => {
    var[update,setUpdate]= useState(false)
    var[selected,setSelected]= useState({})
    var[Books,setBooks] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3005/students")
        .then(response=>{
          setBooks(Books=response.data);
            console.log(response.data);
        })
        .catch(error=>console.log(error))
    },[])
    const updatevalue=(value) =>{
        setSelected(value);
        setUpdate(true);
    }
    const deleteValues =(id)=>{
      console.log("delete clicked"+id)
      axios.delete("http://localhost:3005/students/"+id)
      .then((response)=>{
        console.log(response.idvalue);
        alert("sucessfully deleted");
        window.location.reload(false);
      })
    }
    var finalJSX =<TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Book Name</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Delete</TableCell>
                        <TableCell>Update</TableCell>

                    </TableRow>
                </TableHead> 
                <TableBody>
                    {Books.map((value,index)=>{
                        return<TableRow>
                            <TableCell>{value.id}</TableCell>
                            <TableCell>{value.name}</TableCell>
                            <TableCell>{value.grade}</TableCell>
                            <TableCell>
                          <Button 
                          color='error'
                          onClick={()=>deleteValues(value.id)}>
                            Delete</Button>  
                        </TableCell>
                        <TableCell>
                            <Button color='success' variant='contained' 
                            onClick={()=>updatevalue(value)}>Update</Button>
                        </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        if(update)
         finalJSX=<Addstu data={selected} method="put" />
        return (
            <div>
                {finalJSX}
            </div>
)
}
export default View