import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { MultiSelect } from "react-multi-select-component";
import { getProjectEmployee } from "../../service/projectEmployee/projectEmployee";

const AddMember = ({ employeeId, projectId }) => {
  const [projects, setProjects] = useState([]);
  const [proEmployee, setProEmployee] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:4000/employees`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProjects();
    getProjectEmployee(projectId, setProEmployee);
  }, [projectId, employeeId]);

  const availableEmployees = projects.filter(
    (employee) =>
      !proEmployee.some(
        (projectEmployee) =>
          projectEmployee.employee_id === employee.employee_id
      )
  );

  const deletedEmployees = proEmployee
    .filter((projectEmployee) => projectEmployee.isDeleted == true)
    .map((projectEmployee) => projectEmployee);

  const newdeletedEmployees = projects.filter((employee) =>
    deletedEmployees.some(
      (employees) => employees.employee_id === employee.employee_id
    )
  );

  const combinedEmployees = availableEmployees.concat(newdeletedEmployees);

  const handleEmployeeSelect = (selectedList) => {
    setSelectedEmployees(selectedList);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmationDialogConfirm = async () => {
    console.log("Adding employee to project:", selectedEmployees);
    const employeesData = selectedEmployees.map((employee) => ({
      employee_id: employee.value.employee_id,
      isDeleted: false,
    }));
    try {
      const response = await fetch(
        `http://localhost:3000/projects/${projectId}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeesData),
        }
      );

      if (response.ok) {
        const updatedEmployee2 = [
          ...proEmployee,
          ...employeesData.map((data) => ({ employee_id: data.employee_id })),
        ];
        setProEmployee(updatedEmployee2);
      } else {
        console.error("Failed to add Employee in the project");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    handleConfirmationDialogClose();
  };

  return (
    <>
      <div>
        <Button
          variant="outlined"
          onClick={() => setConfirmationDialogOpen(true)}
          sx={{ marginBottom: "10px" }}
        >
          Add Employee
        </Button>
        <Dialog
          open={confirmationDialogOpen}
          onClose={handleConfirmationDialogClose}
          sx={{
            "& .MuiDialog-paper": {
              width: "30%",
              maxWidth: "none",
              height: "30%",
            },
          }}
        >
          <DialogTitle>Select Employees to Add</DialogTitle>
          <DialogContent>
            <MultiSelect
              options={combinedEmployees.map((employee) => ({
                label: `${employee.firstName} ${employee.lastName}`,
                value: employee,
              }))}
              value={selectedEmployees}
              onChange={handleEmployeeSelect}
              labelledBy={"Select"}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationDialogClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmationDialogConfirm}
              color="primary"
              disabled={selectedEmployees.length === 0}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default AddMember;
