import React from 'react'
import { Link } from "react-router-dom"

const Users = ({users}) => {
    return(<div>
        <h2>Users</h2>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
            </thead>
            <tbody>
                {users.map(u => {
                    return <tr key={u.id}>
                        <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>             
                        <td>{u.blogs.length}</td>
                    </tr>
                })}
            </tbody>
        </table>
        
    </div>)
}

export default Users