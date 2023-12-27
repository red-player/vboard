import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import UserDetails from "./UserDetails";
import { useLocation, useParams } from "react-router-dom";
import UserManagement from "./UserManagement";
import ProjectsComponent from "./ProjectsComponent";
import TaskComponent from "./TaskComponent";
import TopBar from "../../components/topBar/TopBar";
import Modal from "react-modal";

Modal.setAppElement("#root");

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

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { employeeId } = useParams();
  const location = useLocation();
  const userData = location.state?.userData;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {}, [userData]);
  return (
    <>
      <TopBar title={"DashBoard"} backPath={`/login`} />
      <DashboardContainer>
        <Sidebar>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={activeTab}
            onChange={handleTabChange}
          >
            <Tab label="User Details" />
            <Tab label="Task" />
            <Tab label="Projects" />
            <Tab label="UserManagement" />
          </Tabs>
        </Sidebar>
        <ContentContainer>
          <TabPanel value={activeTab} index={0}>
            {activeTab === 0 && <UserDetails userData={userData} />}
            {activeTab === 1 && <TaskComponent employeeId={employeeId} />}
            {activeTab === 2 && <ProjectsComponent />}
            {activeTab === 3 && <UserManagement userData={userData} />}
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

// const UserDetails = () => <div>User Details Component</div>;
// const TaskComponent = () => <div>Task Component</div>;
// const ProjectsComponent = () => <div>Projects Component</div>;
// const UserManagement = () => <div>UserManagement Component</div>;

export default Dashboard;
