import { TextField, Button } from "@mui/material";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <div>
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
        login
      </Button>
    </form>
  </div>
);

export default LoginForm;
