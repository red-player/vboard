import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DeleteBoard = ({ boardId, projectId, employeeId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteBoard = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/projects/${projectId}/board/${boardId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isDeleted: true }),
        }
      );

      if (response.ok) {
        navigate(`/dashboard/${employeeId}/${projectId}`, {
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
        Delete Board
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this Board?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteBoard} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteBoard;
