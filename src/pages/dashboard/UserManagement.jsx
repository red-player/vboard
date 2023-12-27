import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { styled } from "@mui/system";
import Register from "../auth/Register";
import { Button, IconButton, List, ListItem, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAllEmployee } from "../../service/employee";

const ContentContainer = styled("div")({
  padding: "1px",
});

const UserManagement = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allEmployee, setAllEmployee] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getAllEmployee(setAllEmployee);
  }, []);
  return (
    <div>
      <Button
        variant="outlined"
        onClick={openModal}
        style={{
          position: "absolute",
          right: 23,
          top: "15px",
          marginTop: "60px",
        }}
      >
        Add Employee
      </Button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Register Modal"
      >
        <Register userData={userData} />
        <IconButton
          onClick={closeModal}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </Modal>
      <ContentContainer>
        <Typography
          style={{ color: "black", font: "italic", fontSize: "25px" }}
        >
          Members
        </Typography>
        <List sx={{ fontSize: "20px" }}>
          {allEmployee?.map((emp) => (
            <ListItem key={emp.employee_id}>
              Name: {emp.firstName} {emp.lastName}
            </ListItem>
          ))}
        </List>
      </ContentContainer>
    </div>
  );
};

export default UserManagement;
