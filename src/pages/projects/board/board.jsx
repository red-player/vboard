import React, { useEffect, useRef, useState } from "react";
import AddBucket from "../../../components/addModal/AddBucket";
import { getBuckets } from "../../../service/bucket/bucket";
import BucketList from "./bucket/BucketList";

const Board = ({ boardId }) => {
  const [buckets, setBuckets] = useState([]);

  useEffect(() => {
    getBuckets(boardId, setBuckets);
  }, []);

  return (
    <div>
      <AddBucket boardId={boardId} setBuckets={setBuckets} />
      <BucketList buckets={buckets} setBuckets={setBuckets} boardId={boardId} />
    </div>
  );
};
export default Board;
