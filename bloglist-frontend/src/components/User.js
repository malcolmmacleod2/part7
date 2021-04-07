import React from 'react'

const User = ({user}) => {
    
    return(<div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
            {user.blogs.map(b => {
                return <li key={b.id}>{b.title}</li>
            })}
        </ul>
        
    </div>)
}

export default User