// login.jsx
import React, { useState } from "react";
import { Container, Stack, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleAuth } from "../../service/userService";

const initForm = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initForm);

  const handleChange = (event) =>
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));

  const handleLoginClick = async () => {
    try {
      await handleAuth({ form, navigate });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Stack mb={6} spacing={4} alignItems="center" textAlign="center">
        <Typography color="rgba(0,0,0,.6)">Login to Your Account</Typography>
      </Stack>
      <Stack spacing={2}>
        <TextField
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
        />
        <TextField
          value={form.password}
          name="password"
          type="password"
          onChange={handleChange}
          label="Password"
        />

        <Button
          disabled={!form.email.trim() || !form.password.trim()}
          onClick={handleLoginClick}
          size="large"
          variant="contained"
        >
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
