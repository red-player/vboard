// BucketList.jsx
import React, { useEffect } from "react";
import Bucket from "./Bucket";
import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const BucketPanel = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  borderRadius: "5px",
  marginTop: "10px",
  marginBottom: "25px",
  padding: "10px",
  width: "100%",
});

const BucketList = ({ buckets, setBuckets, boardId }) => {
  const activeBuckets = buckets
    ? buckets.filter((bucket) => !bucket.isDeleted)
    : [];

  return (
    <Stack px={3} mt={5}>
      <BucketPanel>
        {activeBuckets.length > 0 ? (
          activeBuckets.map((bucket) => (
            <Bucket
              key={bucket.bucket_id}
              bucketName={bucket.bucket_name}
              description={bucket.description}
              bucketId={bucket.bucket_id}
              boardId={boardId}
              setBuckets={setBuckets}
              style={{ flex: "1" }}
            />
          ))
        ) : (
          <div>No Buckets Available</div>
        )}
      </BucketPanel>
    </Stack>
  );
};

export default BucketList;
