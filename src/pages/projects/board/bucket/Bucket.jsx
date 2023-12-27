import { Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import UpdateBucket from "./UpdateBucket";
import AddTask from "../../../../components/addModal/AddTask";
import DeleteBucket from "./DeleteBucket";
import TaskList from "./task/TaskList";
import { getTask } from "../../../../service/task/task";

const BucketContainer = styled(Grid)({
  padding: "20px",
  width: "500px",
  marginLeft: "20px",
  marginBottom: "40px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
});

const TaskContainer = styled("div")({
  borderRadius: "5px",
  marginTop: "10px",
  marginBottom: "25px",
  marginRight: "25px",
  padding: "10px",
  width: "95%",
});

const Bucket = ({ bucketId, bucketName, description, setBuckets, boardId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTask(bucketId, setTasks);
  }, [bucketId]);

  return (
    <>
      <BucketContainer>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <div>
            <Typography variant="h5">{bucketName}</Typography>
            <Typography variant="body1" sx={{ color: "grey" }}>
              {description}
            </Typography>
          </div>
          <Stack direction="row" spacing={1}>
            <AddTask bucketId={bucketId} setTasks={setTasks} />
            <UpdateBucket
              bucketId={bucketId}
              setBuckets={setBuckets}
              boardId={boardId}
            />
            <DeleteBucket
              bucketId={bucketId}
              setBuckets={setBuckets}
              boardId={boardId}
            />
          </Stack>
        </Stack>
        <TaskContainer>
          <Stack>
            <TaskList tasks={tasks} bucketId={bucketId} setTasks={setTasks} />
          </Stack>
        </TaskContainer>
      </BucketContainer>
    </>
  );
};

export default Bucket;

// const isBucketRenderd = useRef(false);

//   useEffect(() => {
//     if (!isBucketRenderd.current) {
//       getTask(bucketId, setTasks).then((e) => (isBucketRenderd.current = true));
//       {
//         console.log(">s", bucketName);
//       }
//     }
//   }, []);
