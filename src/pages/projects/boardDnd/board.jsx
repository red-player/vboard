import React, { useEffect, useRef, useState } from "react";
import AddBucket from "../../../components/addModal/AddBucket";
import { getBuckets } from "../../../service/bucket/bucket";
import BucketList from "./bucket/BucketListDnd";

const Board = ({ boardId }) => {
  const [buckets, setBuckets] = useState([]);
  // const isBoardRenderd = useRef(false);

  // useEffect(() => {
  //   if (!isBoardRenderd.current) {
  //     getBuckets(boardId, setBuckets).then(
  //       (e) => (isBoardRenderd.current = true)
  //     );
  //   }
  // }, []);
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
