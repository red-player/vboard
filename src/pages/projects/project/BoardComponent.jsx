import React, { useEffect, useState } from "react";
import { getProjects } from "../../../service/project/project";
import { Typography } from "@mui/material";

import BoardList from "./board/BoardList";
import AddBoard from "../../../components/AddModal/AddBoard";

const BoardComponent = ({ projectId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects(projectId, setProjects);
    return () => {};
  }, [projectId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <>
      <Typography sx={{ fontSize: "25px" }}>{projects.project_name}</Typography>
      <Typography sx={{ fontSize: "20px", color: "grey" }}>
        {projects.description}
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "grey" }}>
        Started At: {formatDate(projects.start_date)}
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "red" }}>
        End At: {formatDate(projects.end_date)}
      </Typography>
      <AddBoard projectId={projectId} />
      <BoardList projectId={projectId} />
    </>
  );
};

export default BoardComponent;
