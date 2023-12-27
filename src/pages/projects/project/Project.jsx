import React, { useState } from "react";
import { styled } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BoardComponent from "./BoardComponent";
import { useParams } from "react-router-dom";
import ProjectMember from "./projectmember/ProjectMember";
import ProjectSetting from "./projectSetting/ProjectSetting";
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

const Project = () => {
  const { employeeId, projectId } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <TopBar title={"Projetcs"} backPath={`/dashboard/${employeeId}`} />
      <DashboardContainer>
        <Sidebar>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={activeTab}
            onChange={handleTabChange}
          >
            <Tab label="Boards" />
            <Tab label="Member" />
            <Tab label="Project Setting" />
          </Tabs>
        </Sidebar>
        <ContentContainer>
          <TabPanel value={activeTab} index={0}>
            {activeTab === 0 && <BoardComponent projectId={projectId} />}
            {activeTab === 1 && <ProjectMember projectId={projectId} />}
            {activeTab === 2 && <ProjectSetting projectId={projectId} />}
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

export default Project;
