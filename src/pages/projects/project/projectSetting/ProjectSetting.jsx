import React from "react";
import UpdateProject from "./UpdateProject";
import DeleteProject from "./DeleteProject";
import { useParams } from "react-router-dom";

const ProjectSetting = () => {
  const { employeeId, projectId } = useParams();
  return (
    <div>
      <UpdateProject projectId={projectId} employeeId={employeeId} />
      <DeleteProject projectId={projectId} employeeId={employeeId} />
    </div>
  );
};

export default ProjectSetting;
