import React, { useEffect, useState } from "react";
import { Typography, Paper, Stack } from "@mui/material";

const TaskComponent = ({ employeeId }) => {
  const [eTasks, setETasks] = useState([]);

  useEffect(() => {
    const fetchETasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/employee/${employeeId}/task`
        );
        if (response.ok) {
          const data = await response.json();
          setETasks(data.tasks);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchETasks();
  }, [employeeId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <div>
      {eTasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        eTasks.map((task) => (
          <Paper
            key={task.task_id}
            elevation={3}
            style={{ padding: "10px", marginBottom: "10px" }}
          >
            <Stack sx={{ marginTop: "1px" }}>
              <Typography> Task Name : {task.task_name}</Typography>
              <Typography> Description : {task.description}</Typography>
              <Typography>Project Name : {task.project_name}</Typography>
              <Typography>Dead Line : {formatDate(task.deadline)}</Typography>
            </Stack>
          </Paper>
        ))
      )}
    </div>
  );
};

export default TaskComponent;
