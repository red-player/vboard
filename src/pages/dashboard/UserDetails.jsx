import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import { getEmployee } from "../../service/employee";

const ContentContainer = styled("div")({
  flex: 1,
  padding: "16px",
});

const UserDetails = ({ userData }) => {
  const { employeeId } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    getEmployee(employeeId, setData);
  }, []);

  return (
    <>
      <ContentContainer>
        <div>
          <Typography>
            Name: {userData?.firstName || data?.firstName}{" "}
            {userData?.lastName || data?.lastName}
          </Typography>
          <Typography>
            email :{" "}
            <span
              style={{ color: "grey", fontSize: "16px", fontStyle: "italic" }}
            >
              {userData?.email || data?.email}
            </span>
          </Typography>
        </div>
      </ContentContainer>
      <ContentContainer>
        <div>
          <Typography>
            createdBy: {userData?.createdById || data?.createdById || "MYSELF"}
          </Typography>
        </div>
      </ContentContainer>
    </>
  );
};

export default UserDetails;
