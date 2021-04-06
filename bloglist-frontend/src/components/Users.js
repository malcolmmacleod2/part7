import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const Users = () => {
    const [users, setUsers] = useState([]) 
    useEffect(() => {

        const fetchUsers = async () => {
            const allUsers = await userService.getAll()
            console.log(allUsers)
            setUsers(allUsers)
        }
        
        fetchUsers()
    }, [])   

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
                        <td>{u.name}</td>
                        <td>{u.blogs.length}</td>
                    </tr>
                })}
            </tbody>
        </table>
        
    </div>)
}

export default Users