import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

const AddBoard = ({ projectId }) => {
  const [boardName, setBoardName] = useState("");
  const [description, setDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddBoard = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/projects/${projectId}/board`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            boardName,
            description,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOpenDialog(false);
        setBoardName("");
        setDescription("");
      } else {
        console.error("Failed to add Board");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setBoardName("");
    setDescription("");
    setOpenDialog(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleOpenDialog}
        style={{
          position: "relative",
          right: 0,
          left: 1137,
          top: "15px",
          marginTop: "10px",
        }}
      >
        Add Board
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Stack p={2}>
          <DialogTitle>Add Board</DialogTitle>
          <DialogContent>
            <TextField
              sx={{ marginBottom: "10px" }}
              label="Board Name"
              variant="outlined"
              fullWidth
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />

            <TextField
              sx={{ marginBottom: "10px" }}
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddBoard}>Add Board</Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
};

export default AddBoard;
