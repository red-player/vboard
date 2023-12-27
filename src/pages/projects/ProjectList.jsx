import { Button, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProjectList = ({ eProjects }) => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const handleNav = (projectId) => {
    navigate(`/dashboard/${employeeId}/${projectId}`);
  };

  if (!Array.isArray(eProjects) || eProjects.length === 0) {
    return (
      <Typography style={{ color: "black", font: "italic", fontSize: "25px" }}>
        No projects available
      </Typography>
    );
  }

  return (
    <>
      <Typography style={{ color: "black", font: "italic", fontSize: "25px" }}>
        Projects
      </Typography>
      <List>
        {eProjects.map((project) => (
          <ListItem key={project.project_id}>
            Project Name:
            <Button
              sx={{
                marginTop: "3px",
                padding: "10px 10px",
                height: "50px",
                color: "#007BFF",
                textAlign: "left",
              }}
              onClick={() => handleNav(project.project_id)}
            >
              {project.project_name}
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ProjectList;
