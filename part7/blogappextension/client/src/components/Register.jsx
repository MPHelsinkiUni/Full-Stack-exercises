import { TextField, Button } from "@mui/material";
import { useStoreActions } from "../store";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const Register = () => {
  const username = useField("text");
  const name = useField("text");
  const password = useField("password");
  const navigate = useNavigate();
  const { register } = useStoreActions();

  const handleRegister = async (event) => {
    event.preventDefault();

    const success = await register({
      username: username.value,
      name: name.value,
      password: password.value,
    });

    if (success) {
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleRegister}>
        <div>
          <TextField {...username} label="Username" id="username" />
        </div>
        <div>
          <TextField {...name} label="Name" id="name" />
        </div>
        <div>
          <TextField {...password} label="Password" id="password" />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          register
        </Button>
      </form>
    </div>
  );
};

export default Register;
