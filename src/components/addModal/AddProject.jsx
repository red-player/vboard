import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Input,
  InputLabel,
} from "@mui/material";
import { getEProjects } from "../../service/project/project";

export const AddProject = ({ employeeId, setEProjects }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddProject = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/projects/${employeeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectName,
            description,
            startDate,
            endDate,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOpenDialog(false);
        setProjectName("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        getEProjects(employeeId, setEProjects);
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
    setProjectName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setOpenDialog(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleOpenDialog}
        style={{
          position: "absolute",
          right: 23,
          top: "15px",
          marginTop: "60px",
        }}
      >
        Add Project
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Stack p={2}>
          <DialogTitle>Add Project</DialogTitle>
          <DialogContent>
            <TextField
              sx={{ marginBottom: "10px" }}
              label="Project Name"
              variant="outlined"
              fullWidth
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
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

            <InputLabel htmlFor="startDate">start Date</InputLabel>
            <Input
              id="startDate"
              variant="outlined"
              type="date"
              fullWidth
              inputProps={{
                style: { height: "55px" },
              }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <InputLabel htmlFor="endDate">End Date</InputLabel>
            <Input
              id="endDate"
              variant="outlined"
              type="date"
              fullWidth
              inputProps={{
                style: { height: "55px" },
              }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddProject}>Add Project</Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
};
