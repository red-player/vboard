import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  InputLabel,
  Input,
} from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { getTask } from "../../service/task/task";

const AddTask = ({ bucketId, setTasks }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddTask = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/bucket/${bucketId}/task`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskName,
            description,
            deadline,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOpenDialog(false);
        setTaskName("");
        setDescription("");
        setDeadline("");
        getTask(bucketId, setTasks);
      } else {
        console.error("Failed to add Task");
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
      <Tooltip title="ADD TASK">
        <IconButton onClick={handleOpenDialog}>
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Stack p={2}>
          <DialogTitle>Add Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Task Name"
              variant="outlined"
              fullWidth
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
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

            <InputLabel htmlFor="deadline" sx={{ marginTop: "10px" }}>
              Deadline
            </InputLabel>
            <Input
              id="deadline"
              variant="outlined"
              type="date"
              fullWidth
              inputprops={{
                style: { height: "55px" },
              }}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
};

export default AddTask;
