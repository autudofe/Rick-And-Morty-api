import React from "react";
import CardUi from "./CardUi/CardUi";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

const Content = ({ results, ...props }) => {
  if (!results)
    return (
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mt: 4, flexGrow: 1, display: "flex", justifyContent: "center" }}
      >
        No cards...
      </Typography>
    );

  return (
    <Container sx={{ py: 2 }} maxWidth="lg">
      <Grid container spacing={4}>
        {results.map((card) => {
          return (
            <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
              <CardUi {...props} card={card} props />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Content;
