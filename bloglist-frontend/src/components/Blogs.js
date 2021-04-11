import React from 'react'
import { Link } from "react-router-dom"

const Blogs = ({blogs}) => {
    return(<div>
        <table>
            <tbody>
                {blogs.map(b => {
                    return <tr key={b.id}>
                        <td><Link to={`/blogs/${b.id}`}>{b.title} {b.author}</Link></td>             
                    </tr>
                })}
            </tbody>
        </table>
        
    </div>)
}

export default Blogs