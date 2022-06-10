import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationPages = ({ pageNumber, info, setPageNumber }) => {
  return (
    <Stack spacing={2} sx={{ marginY: 5 }}>
      <Pagination
        count={info?.pages}
        page={pageNumber}
        onChange={(e, num) => setPageNumber(num)}
        shape="rounded"
        sx={{ marginX: "auto" }}
        color="primary"
      />
    </Stack>
  );
};

export default PaginationPages;
