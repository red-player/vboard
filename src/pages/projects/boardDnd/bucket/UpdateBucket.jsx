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
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { IconButton, Tooltip } from "@mui/material";
import { getBuckets } from "../../../../service/bucket/bucket";

const UpdateBucket = ({ boardId, bucketId, setBuckets }) => {
  const [bucketName, setBucketName] = useState("");
  const [description, setDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleUpdateBucket = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/board/${boardId}/bucket/${bucketId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bucketName,
            description,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOpenDialog(false);
        setBucketName("");
        setDescription("");
        getBuckets(boardId, setBuckets);
      } else {
        console.error("Failed to Update bucket");
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
    <>
      <Tooltip title="UPDATE BUCKET">
        <IconButton onClick={handleOpenDialog}>
          <UpgradeIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Stack p={2}>
          <DialogTitle>Update Bucket</DialogTitle>
          <DialogContent>
            <TextField
              label="Bucket Name"
              variant="outlined"
              fullWidth
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
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
            <Button onClick={handleUpdateBucket}>Update bucket</Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </>
  );
};

export default UpdateBucket;
