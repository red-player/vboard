// TopBarWithBack.jsx
import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const TopBar = ({ title, backPath }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(backPath);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          onClick={handleBack}
          edge="start"
          color="inherit"
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
