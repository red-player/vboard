import React, { useEffect, useState } from "react";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { getAllBoard } from "../../../../service/board/board";
import Board from "./Board";

const BoardList = ({ projectId, allBoard }) => {
  const filteredBoards = allBoard
    ? allBoard.filter((board) => !board.isDeleted)
    : [];

  return (
    <div>
      <Container maxWidth="md">
        <Stack px={3} mt={5}>
          {filteredBoards.length === 0 ? (
            <Typography variant="h6">No boards available.</Typography>
          ) : (
            <Grid container spacing={4}>
              {filteredBoards.map((board) => (
                <Board
                  projectId={projectId}
                  key={board.board_id}
                  boardId={board.board_id}
                  boardName={board.board_name}
                  description={board.description}
                  {...board}
                />
              ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </div>
  );
};

export default BoardList;
