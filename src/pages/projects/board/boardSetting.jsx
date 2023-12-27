import React from "react";
import UpdateBoard from "./UpdateBoard";
import DeleteBoard from "./DeleteBoard";

const BoardSetting = ({ employeeId, boardId, projectId }) => {
  return (
    <>
      <UpdateBoard boardId={boardId} projectId={projectId} />
      <DeleteBoard
        projectId={projectId}
        boardId={boardId}
        employeeId={employeeId}
      />
    </>
  );
};

export default BoardSetting;
