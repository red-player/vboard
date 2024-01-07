// import { Grid, Stack, Typography } from "@mui/material";
// import React, { useEffect, useState, memo } from "react";
// import { Droppable } from "react-beautiful-dnd";
// import { getTask } from "../../../service/task/task";
// import TaskDnd from "./bucket/task/Task";
// import { styled } from "@mui/system";

// const BucketPanel = styled("div")({
//   display: "flex",
//   flexDirection: "row",
//   gap: "20px",
//   marginTop: "10px",
//   marginBottom: "25px",
// });

// const BucketContainer = styled(Grid)({
//   padding: "20px",
//   width: "200px",
//   marginLeft: "20px",
//   borderRadius: "10px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
// });

// const TaskContainer = styled("div")({
//   borderRadius: "5px",
//   marginTop: "10px",
//   marginBottom: "25px",
//   marginRight: "25px",
//   padding: "10px",
//   width: "95%",
// });

// const BoardDnd = ({ bucketId, bucketName, description }) => {
//   const [tasks, setTasks] = useState([]);
//   useEffect(() => {
//     getTask(bucketId, setTasks);
//   }, []);

//   return (
//     <>
//       <Droppable droppableId={bucketId}>
//         {(provided) => (
//           <BucketPanel {...provided.droppableProps} ref={provided.innerRef}>
//             <BucketContainer>
//               <Stack>
//                 <Typography>{bucketName}</Typography>
//               </Stack>
//               <Stack>
//                 <TaskContainer>
//                   {tasks?.map((task, index) => (
//                     <TaskDnd
//                       taskName={task.task_name}
//                       id={task.task_id}
//                       index={index}
//                     />
//                   ))}
//                 </TaskContainer>
//               </Stack>
//               {provided.placeholder}
//             </BucketContainer>
//           </BucketPanel>
//         )}
//       </Droppable>
//     </>
//   );
// };

// export default memo(BoardDnd);

import React, { useEffect, useRef, useState } from "react";
import AddBucket from "../../../components/addModal/AddBucket";
import { getBuckets } from "../../../service/bucket/bucket";
import BucketListDnd from "./bucket/BucketListDnd";
import { DragDropContext } from "react-beautiful-dnd";

const BoardDnd = ({ boardId }) => {
  const [buckets, setBuckets] = useState([]);

  useEffect(() => {
    getBuckets(boardId, setBuckets);
  }, []);

  return (
    <>
      <AddBucket boardId={boardId} setBuckets={setBuckets} />
      <BucketListDnd
        bucketId={buckets.map((bucket) => bucket.bucket_id)}
        buckets={buckets}
        setBuckets={setBuckets}
        boardId={boardId}
      />
    </>
  );
};
export default BoardDnd;
