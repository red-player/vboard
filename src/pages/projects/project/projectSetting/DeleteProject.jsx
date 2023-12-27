import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DeleteProject = ({ employeeId, projectId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteProject = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isDeleted: true }),
        }
      );

      if (response.ok) {
        navigate(`/dashboard/${employeeId}`, {
          state: {},
        });
      } else {
        console.error("Failed to soft delete project");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleOpenDialog}
        sx={{ marginTop: "10px" }}
      >
        Delete Project
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this project?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProject} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteProject;
