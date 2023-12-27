import React from "react";
import { styled } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";
import AddTaskMember from "../../../../../components/addModal/AddTaskMember";

const TaskItem = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "5px",
  marginBottom: "10px",
  padding: "10px",
  width: "100%",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
});

const TaskList = ({ tasks, bucketId, setTasks }) => {
  const activeTasks = tasks.filter((task) => !task.isDeleted);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <>
      {activeTasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        activeTasks.map((task) => (
          <TaskItem key={task.task_id}>
            <div>
              <Typography>Task Name : {task.task_name}</Typography>
              <Typography> Description : {task.description}</Typography>
              <Typography>Deadline : {formatDate(task.deadline)}</Typography>
            </div>
            <Stack direction="row" spacing={1}>
              <AddTaskMember task_id={task.task_id} />
              <UpdateTask
                bucketId={bucketId}
                taskId={task.task_id}
                setTasks={setTasks}
              />
              <DeleteTask
                bucketId={bucketId}
                taskId={task.task_id}
                setTasks={setTasks}
              />
            </Stack>
          </TaskItem>
        ))
      )}
    </>
  );
};

export default TaskList;
