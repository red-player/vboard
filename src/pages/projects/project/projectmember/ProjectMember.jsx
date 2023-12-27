import React, { useEffect, useState } from "react";
import { getProjectEmployee } from "../../../../service/projectEmployee/projectEmployee";
import { getAllEmployee } from "../../../../service/employee";
import { Box, List, ListItem, Typography } from "@mui/material";
import DeleteMember from "../../../../components/deleteModal/DeleteMember";
import AddMember from "../../../../components/AddModal/AddMember";

const ProjectMember = ({ projectId }) => {
  const [proEmployee, setProEmployee] = useState();
  const [allEmployee, setAllEmployee] = useState();
  useEffect(() => {
    getProjectEmployee(projectId, setProEmployee);
    getAllEmployee(setAllEmployee);
  }, []);

  const filtermember = allEmployee?.filter((aemp) =>
    proEmployee?.some((pemp) => aemp.employee_id === pemp.employee_id)
  );

  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent={"space-between"}>
        <AddMember projectId={projectId} />
        <DeleteMember />
      </Box>
      <Typography sx={{ color: "black", fontSize: "20px" }}>
        Members in the project
      </Typography>
      {Array.isArray(filtermember) && filtermember.length > 0 ? (
        <List sx={{ fontSize: "20px" }}>
          {filtermember?.map((emp) => (
            <ListItem key={emp.employee_id}>
              Name: {emp.firstName} {emp.lastName}
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No members available for this project</p>
      )}
    </div>
  );
};

export default ProjectMember;
