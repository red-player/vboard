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
import { getBuckets } from "../../../../service/bucket/bucket";

const DeleteBucket = ({ boardId, bucketId, setBuckets }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteBucket = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/board/${boardId}/bucket/${bucketId}`,
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
        getBuckets(boardId, setBuckets);
      } else {
        console.error("Failed to soft delete project");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Tooltip title="DELETE BUCKET">
        <IconButton onClick={handleOpenDialog}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this Bucket?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteBucket} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteBucket;
