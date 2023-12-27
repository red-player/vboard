import React, { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";

const DeleteMember = ({ projectId }) => {
  const { employeeId } = useParams();
  const [projects, setProjects] = useState([]);
  const [employee2, setEmployee2] = useState([]);
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

    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/projects/${projectId}/members`
        );
        if (response.ok) {
          const data = await response.json();

          setEmployee2(data);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProjects();
    fetchEmployee();
  }, [projectId]);

  const logged = employeeId;

  const availableEmployees = employee2.filter(
    (employee) => employee.employee_id != logged && employee.isDeleted === false
  );

  const name = projects.filter((employee) =>
    availableEmployees.some(
      (employees) => employees.employee_id === employee.employee_id
    )
  );

  const handleEmployeeSelect = (selectedList) => {
    setSelectedEmployees(selectedList);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmationDialogConfirm = async () => {
    console.log("deleting employee from project:", selectedEmployees);

    const employeesData = selectedEmployees.map((employee) => ({
      employee_id: employee.value.employee_id,
    }));

    try {
      const response = await fetch(
        `http://localhost:4000/projects/${projectId}/members`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeesData),
        }
      );

      if (response.ok) {
        const updatedEmployee2 = [
          ...employee2,
          ...employeesData.map((data) => ({ employee_id: data.employee_id })),
        ];
        setEmployee2(updatedEmployee2);
      } else {
        console.error("Failed to soft delete Employee in the project");
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
          Delete Employee
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
          <DialogTitle>Select Employees to Delete</DialogTitle>
          <DialogContent>
            <MultiSelect
              options={name.map((employee) => ({
                label: `${employee.firstName} ${employee.lastName} - ${employee.employee_id}`,
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
export default DeleteMember;
