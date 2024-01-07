import { Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import UpdateBucket from "./UpdateBucket";
import AddTask from "../../../../components/addModal/AddTask";
import DeleteBucket from "./DeleteBucket";
import {
  bottomtotop,
  getTask,
  toptobottom,
} from "../../../../service/task/task";
import TaskListDnd from "./task/TaskListDnd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

const BucketDnd = ({
  bucketId,
  bucketName,
  description,
  setBuckets,
  boardId,
}) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTask(bucketId, setTasks);
  }, [bucketId]);

  const dragHandle = async (result) => {
    console.log(result);
    const { source, destination, draggableId } = result;
    const bucketId = destination.droppableId;
    const taskId = draggableId;
    const index = destination.index;

    if (!destination) {
      return;
    }
    try {
      if (source.index >= destination.index) {
        await bottomtotop(bucketId, taskId, index);
      } else if (source.index < destination.index) {
        await toptobottom(bucketId, taskId, index);
      }
    } catch (error) {
      console.error(error);
    } finally {
      getTask(bucketId, setTasks);
    }
  };

  return (
    <>
      {/* <DragDropContext onDragEnd={dragHandle}> */}
      <Droppable droppableId={bucketId}>
        {(provided) => (
          <BucketContainer {...provided.droppableProps} ref={provided.innerRef}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <div>
                <Typography variant="h5">
                  {bucketName} {bucketId}{" "}
                </Typography>
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
                <TaskListDnd
                  tasks={tasks}
                  bucketId={bucketId}
                  setTasks={setTasks}
                />
              </Stack>
            </TaskContainer>
            {provided.placeholder}
          </BucketContainer>
        )}
      </Droppable>
      {/* </DragDropContext> */}
    </>
  );
};

export default BucketDnd;

// Bucket.jsx
// import React from "react";
// import { Grid, Stack, Typography } from "@mui/material";
// import { styled } from "@mui/system";
// import UpdateBucket from "./UpdateBucket";
// import AddTask from "../../../../components/addModal/AddTask";
// import DeleteBucket from "./DeleteBucket";
// import TaskList from "./task/TaskList";
// import { Droppable, Draggable } from "react-beautiful-dnd";

// const BucketContainer = styled(Grid)({
//   padding: "20px",
//   width: "500px",
//   marginLeft: "20px",
//   marginBottom: "40px",
//   borderRadius: "10px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
// });

// const Bucket = ({
//   bucketId,
//   bucketName,
//   description,
//   setBuckets,
//   boardId,
//   index,
// }) => {
//   return (
//     <Draggable draggableId={bucketId} index={index}>
//       {(provided) => (
//         <div
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//         >
//           <BucketContainer>
//             <Stack
//               direction="row"
//               alignItems="center"
//               justifyContent="space-between"
//             >
//               <div>
//                 <Typography variant="h5">{bucketName}</Typography>
//                 <Typography variant="body1" sx={{ color: "grey" }}>
//                   {description}
//                 </Typography>
//               </div>
//               <Stack direction="row" spacing={1}>
//                 <AddTask bucketId={bucketId} setTasks={setTasks} />
//                 <UpdateBucket
//                   bucketId={bucketId}
//                   setBuckets={setBuckets}
//                   boardId={boardId}
//                 />
//                 <DeleteBucket
//                   bucketId={bucketId}
//                   setBuckets={setBuckets}
//                   boardId={boardId}
//                 />
//               </Stack>
//             </Stack>
//             <TaskContainer>
//               <Stack>
//                 <TaskList
//                   tasks={tasks}
//                   bucketId={bucketId}
//                   setTasks={setTasks}
//                 />
//               </Stack>
//             </TaskContainer>
//           </BucketContainer>
//         </div>
//       )}
//     </Draggable>
//   );
// };

// export default Bucket;
