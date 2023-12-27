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

const UpdateBoard = ({ boardId, projectId }) => {
  const [boardName, setBoardName] = useState("");
  const [description, setDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddBoard = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/projects/${projectId}/board/${boardId}`,
        {
          method: "PATCH",
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
        console.error("Failed to add project");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpenDialog}>
        Update Board
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Stack p={2}>
          <DialogTitle>Update Board</DialogTitle>
          <DialogContent>
            <TextField
              label="Board Name"
              variant="outlined"
              fullWidth
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              sx={{ marginTop: "10px" }}
            />

            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginTop: "10px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddBoard}>Update Board</Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
};
export default UpdateBoard;
