// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { DragDropContext } from "react-beautiful-dnd";
// import { Grid, Typography, Tabs, Tab } from "@mui/material";
// import TopBar from "../../../components/topBar/TopBar";
// import BoardDnd from "./BoardDnd";
// import { getBuckets } from "../../../service/bucket/bucket";
// import styled from "@emotion/styled";

// const DashboardContainer = styled("div")({
//   display: "flex",
//   height: "100vh",
// });

// const Sidebar = styled("div")({
//   borderRight: "1px solid #ccc",
//   minWidth: "100px",
//   padding: "16px",
//   backgroundColor: "#f0f0f0",
// });

// const ContentContainer = styled("div")({
//   flex: 1,
//   padding: "16px",
// });

// const TabPanel = styled("div")({
//   padding: "16px",
//   backgroundColor: "#ffffff",
//   borderRadius: "5px",
//   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//   marginBottom: "25px",
// });

// const BoardPageDnd = () => {
//   const { employeeId, boardId, projectId } = useParams();
//   const [buckets, setBuckets] = useState([]);
//   const [activeTab, setActiveTab] = useState(0);

//   useEffect(() => {
//     getBuckets(boardId, setBuckets);
//   }, []);

//   const handleDnd = () => {
//     // Handle drag-and-drop logic here
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   return (
//     <>
//       <DragDropContext onDragEnd={handleDnd}>
//         <TopBar
//           title={"Board Dnd"}
//           backPath={`/dashboard/${employeeId}/${projectId}`}
//         />

//         <DashboardContainer>
//           <Sidebar>
//             <Tabs
//               orientation="vertical"
//               variant="scrollable"
//               value={activeTab}
//               onChange={handleTabChange}
//             >
//               <Tab label="Board" />
//               <Tab label="Board Setting" />
//             </Tabs>
//           </Sidebar>
//           <ContentContainer>
//             <TabPanel value={activeTab} index={0}>
//               {buckets?.map((bucket) => (
//                 <BoardDnd
//                   key={bucket.bucket_id}
//                   bucketId={bucket.bucket_id}
//                   bucketName={bucket.bucket_name}
//                   description={bucket.description}
//                 />
//               ))}
//             </TabPanel>
//           </ContentContainer>
//         </DashboardContainer>
//       </DragDropContext>
//     </>
//   );
// };

// export default BoardPageDnd;

import React, { useState } from "react";
import { styled } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import TopBar from "../../../components/topBar/TopBar";
import BoardDnd from "./BoardDnd";
import { DragDropContext } from "react-beautiful-dnd";

const DashboardContainer = styled("div")({
  display: "flex",
  height: "100vh",
});

const Sidebar = styled("div")({
  borderRight: "1px solid #ccc",
  minWidth: "100px",
  padding: "16px",
  backgroundColor: "#f0f0f0",
});

const ContentContainer = styled("div")({
  flex: 1,
  padding: "16px",
});

const BoardPageDnd = () => {
  const { employeeId, boardId, projectId } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDnd = (result) => {
    const { source, destination, draggableId } = result;

    console.log(result);
  };

  return (
    <>
      <TopBar
        title={"Board"}
        backPath={`/dashboard/${employeeId}/${projectId}`}
      />
      <>
        <DashboardContainer>
          <Sidebar>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={activeTab}
              onChange={handleTabChange}
            >
              <Tab label="Board" />
              <Tab label="Board Setting" />
            </Tabs>
          </Sidebar>
          <ContentContainer>
            <TabPanel value={activeTab} index={0}>
              {activeTab === 0 && <BoardDnd boardId={boardId} />}
              {/* {activeTab === 1 && (
              <BoardSetting
                projectId={projectId}
                boardId={boardId}
                employeeId={employeeId}
              />
            )} */}
            </TabPanel>
          </ContentContainer>
        </DashboardContainer>
      </>
    </>
  );
};

const TabPanel = styled("div")({
  padding: "16px",
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  marginBottom: "25px",
});

export default BoardPageDnd;
