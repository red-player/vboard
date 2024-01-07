// import { Stack, Typography } from "@mui/material";
// import React, { memo } from "react";
// import { Draggable } from "react-beautiful-dnd";
// import { styled } from "@mui/system";

// const TaskItem = styled("div")({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   borderRadius: "5px",
//   marginBottom: "10px",
//   padding: "10px",
//   width: "100%",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
// });
// const TaskDnd = ({ id, index, taskName }) => {
//   return (
//     <>
//       <Draggable draggableId={id} index={index}>
//         {(provided) => (
//           <Stack
//             {...provided.dragHandleProps}
//             {...provided.draggableProps}
//             ref={provided.innerRef}
//           >
//             <TaskItem>
//               <Typography>{taskName}</Typography>
//             </TaskItem>
//           </Stack>
//         )}
//       </Draggable>
//     </>
//   );
// };

// export default memo(TaskDnd);
