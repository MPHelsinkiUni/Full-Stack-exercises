import { TextField, Button } from "@mui/material";
import { useStoreActions, useUsernameData, usePasswordData } from "../store";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const username = useUsernameData()
  const password = usePasswordData()
  const navigate = useNavigate();
  const { handlePasswordChange, handleUsernameChange, login } = useStoreActions()

  const handleLogin = event => {
    const response = login(event)
    if (response) {
      navigate("/")
    }
  }

  return (
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
)
};

export default LoginForm;
