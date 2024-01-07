import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard/Dashboard";
import Project from "../pages/projects/project/Project";
import BoardPage from "../pages/projects/board/boardPage";
import BoardPageDnd from "../pages/projects/boardDnd/BoardPageDnd";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="dashboard/:employeeId" element={<Dashboard />} />
      <Route path="dashboard/:employeeId/:projectId" element={<Project />} />
      <Route
        path="dashboard/:employeeId/:projectId/:boardId"
        element={<BoardPage />}
      />
      <Route
        path="dashboard/:employeeId/:projectId/:boardId/v2"
        element={<BoardPageDnd />}
      />
    </Routes>
  );
};

export default AppRoutes;
