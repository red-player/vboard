import React, { useEffect, useState } from "react";
import { AddProject } from "../../components/addModal/AddProject";
import { useParams } from "react-router-dom";
import { getEProjects } from "../../service/project/project";
import ProjectList from "../projects/ProjectList";

const ProjectsComponent = () => {
  const { employeeId } = useParams();
  const [eProjects, setEProjects] = useState([]);
  useEffect(() => {
    getEProjects(employeeId, setEProjects);
  }, [employeeId]);
  return (
    <>
      <AddProject employeeId={employeeId} setEProjects={setEProjects} />
      <ProjectList
        eProjects={eProjects?.employeeProjectData?.map(
          (projects) => projects.project
        )}
      />
    </>
  );
};

export default ProjectsComponent;
