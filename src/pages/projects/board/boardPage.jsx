import React, { useState } from "react";
import { styled } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import Board from "./Board";
import BoardSetting from "./boardSetting";
import TopBar from "../../../components/topBar/TopBar";

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

const BoardPage = () => {
  const { employeeId, boardId, projectId } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <TopBar
        title={"Board"}
        backPath={`/dashboard/${employeeId}/${projectId}`}
      />
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
            {activeTab === 0 && <Board boardId={boardId} />}
            {activeTab === 1 && (
              <BoardSetting
                projectId={projectId}
                boardId={boardId}
                employeeId={employeeId}
              />
            )}
          </TabPanel>
        </ContentContainer>
      </DashboardContainer>
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

export default BoardPage;
