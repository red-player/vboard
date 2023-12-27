import React, { useState } from "react";
import { Stack, Grid, Typography, IconButton, Box, Paper } from "@mui/material";
import OpenIcon from "@mui/icons-material/Launch";
import DescriptionIcon from "@mui/icons-material/Description";
import {  useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const Board = ({ boardName, description, boardId, projectId }) => {
  const navigate = useNavigate();

  const [isDescriptionOpen, setDescriptionOpen] = useState(false);

  const handleClick = () => {
    navigate(`${boardId}`);
  };

  const handleDescription = () => {
    setDescriptionOpen(true);
  };

  const handleCloseDescription = () => {
    setDescriptionOpen(false);
  };

  return (
    <div>
      <Grid item xs={3}>
        <Stack p={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Paper
              elevation={2}
              sx={{
                borderRadius: "10px",
                transition: "box-shadow 0.3s",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                p={2}
              >
                <Typography
                  whiteSpace="nowrap"
                  fontWeight={400}
                  variant="h6"
                  sx={{ marginRight: "5px" }}
                >
                  {boardName}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <IconButton onClick={handleClick} size="small">
                    <OpenIcon />
                  </IconButton>

                  <IconButton onClick={handleDescription}>
                    <DescriptionIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </Grid>
      <div>
        <Dialog open={isDescriptionOpen} onClose={handleCloseDescription}>
          <DialogTitle>Description</DialogTitle>
          <DialogContent>
            <Typography>{description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDescription} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Board;
