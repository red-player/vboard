// BucketList.jsx
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { styled } from "@mui/system";
import BucketDnd from "./BucketDnd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

const BucketListDnd = ({ buckets, setBuckets, boardId }) => {
  const activeBuckets = buckets
    ? buckets.filter((bucket) => !bucket.isDeleted)
    : [];

  const onDragEnd = (result) => {
    console.log("result", result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-buckets" direction="horizontal">
        {(provided) => (
          <Stack
            px={3}
            mt={5}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <BucketPanel>
              {activeBuckets.length > 0 ? (
                activeBuckets.map((bucket, index) => (
                  <BucketDnd
                    key={bucket.bucket_id}
                    bucketName={bucket.bucket_name}
                    description={bucket.description}
                    bucketId={bucket.bucket_id}
                    boardId={boardId}
                    setBuckets={setBuckets}
                    index={index}
                    style={{ flex: "1" }}
                  />
                ))
              ) : (
                <div>No Buckets Available</div>
              )}
            </BucketPanel>
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BucketListDnd;
