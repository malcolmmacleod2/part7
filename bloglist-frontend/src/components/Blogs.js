import React from 'react'
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const Blogs = ({blogs}) => {
    return(
    <TableContainer component={Paper}>
        <Table>
            <TableBody>
                {blogs.map(b => {
                    return <TableRow key={b.id}>
                        <TableCell><Link to={`/blogs/${b.id}`}>{b.title} {b.author}</Link></TableCell>             
                    </TableRow>
                })}
            </TableBody>
        </Table>
        
    </TableContainer>)
}

export default Blogs