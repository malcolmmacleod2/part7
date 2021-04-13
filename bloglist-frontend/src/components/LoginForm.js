import React from 'react'
import { TextField, Button } from '@material-ui/core'

const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField label="username"
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={setUsername}
          />
        </div>
        <div>
          <TextField label="password" type="password"
            id="password"
            value={password}
            name="Password"
            onChange={setPassword}
          />
        </div>
        <Button id="login-button" type="submit">login</Button>
      </form>
    </div>
  )
}

export default LoginForm
