import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { MultiSelect } from "react-multi-select-component";
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddTaskMember = ({ task_id }) => {
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
          console.error("Failed to fetch employees");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProjects();
  }, []);

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
    console.log("Adding employee to task:", selectedEmployees);

    const employeesData = selectedEmployees.map((employee) => ({
      employeeId: employee.value.employee_id,
      isDeleted: false,
    }));
    try {
      const response = await fetch(`http://localhost:4000/employee/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeesData, task_id }),
      });

      if (response.ok) {
        const updatedEmployee2 = [
          ...proEmployee,
          ...employeesData.map((data) => ({ employee_id: data.employeeId })),
        ];
        setProEmployee(updatedEmployee2);
      } else {
        console.error("Failed to add Employee to the task");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    handleConfirmationDialogClose();
  };

  return (
    <>
      <div>
        <Tooltip title="ASSIGN MEMBER">
          <IconButton onClick={() => setConfirmationDialogOpen(true)}>
            <AddIcon />
          </IconButton>
        </Tooltip>

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

export default AddTaskMember;
