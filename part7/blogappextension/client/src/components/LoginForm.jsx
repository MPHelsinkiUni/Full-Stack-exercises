import { TextField, Button } from "@mui/material";
import { useStoreActions } from "../store";
import { useNavigate } from "react-router-dom";
import { useField } from '../hooks';

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const navigate = useNavigate();
  const { login } = useStoreActions()

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
          {...username}
          label="Username"
          id="username"
        />
      </div>
      <div>
        <TextField
          {...password}
          label="Password"
          id="password"
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
