import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTask } from "../../../../../service/task/task";

const DeleteTask = ({ bucketId, taskId, setTasks }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/bucket/${bucketId}/task/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isDeleted: true }),
        }
      );
      if (response.ok) {
        setOpenDialog(false);
        getTask(bucketId, setTasks);
      } else {
        console.error("Failed to soft delete Task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Tooltip title="DELETE TASK">
        <IconButton onClick={handleOpenDialog}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this Task?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTask} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteTask;
