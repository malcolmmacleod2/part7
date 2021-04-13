import React from 'react'
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from '@material-ui/core'

const Users = ({users}) => {
    return(<div>
        <h2>Users</h2>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>blogs created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(u => {
                        return <TableRow key={u.id}>
                            <TableCell><Link to={`/users/${u.id}`}>{u.name}</Link></TableCell>             
                            <TableCell>{u.blogs.length}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        
        
    </div>)
}

export default Users