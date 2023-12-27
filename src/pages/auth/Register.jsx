import React, { useState } from "react";
import { Container, Stack, TextField, Button, Typography } from "@mui/material";
import { handleRegister } from "../../service/userService";
import { useParams } from "react-router-dom";

const Register = ({ userData }) => {
  const { employeeId } = useParams();
  const initForm = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    createdById: userData?.employee_id || employeeId,
  };
  const [form, setForm] = useState(initForm);

  const handleChange = (event) =>
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));

  const handleRegisterClick = async () => {
    try {
      await handleRegister({ form });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Stack mb={6} spacing={4} alignItems="center" textAlign="center">
        <Typography color="rgba(0,0,0,.6)">Register an Employee</Typography>
      </Stack>
      <Stack spacing={2}>
        <TextField
          value={form.firstName}
          name="firstName"
          onChange={handleChange}
          label="First Name"
        />
        <TextField
          value={form.lastName}
          name="lastName"
          onChange={handleChange}
          label="Last Name"
        />
        <TextField
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
        />
        <TextField
          value={form.password}
          name="password"
          onChange={handleChange}
          label="Password"
        />

        <Button
          disabled={!form.email.trim() || !form.password.trim()}
          onClick={handleRegisterClick}
          size="large"
          variant="contained"
        >
          Register
        </Button>
      </Stack>
    </Container>
  );
};

export default Register;
