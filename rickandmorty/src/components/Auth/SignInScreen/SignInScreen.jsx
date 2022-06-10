import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FacebookIcon from "@mui/icons-material/Facebook";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from "react-router-dom";
import {
  signInWithProvider,
  providerFacebook,
} from "../../../Firebase/Firebase";
import { UserContext } from "../../../App";

const SignInScreen = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          sx={{
            pt: 1,
            pb: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
          }}
        >
          <Button
            size="large"
            fullWidth
            sx={{ mt: 1, mb: 1 }}
            variant="contained"
            startIcon={<FacebookIcon />}
            onClick={signInWithProvider(providerFacebook, setUser)}
          >
            Sign in with Facebook
          </Button>
          <Button
            size="large"
            fullWidth
            sx={{ mt: 2, mb: 1, backgroundColor: "secondary.main" }}
            variant="contained"
            startIcon={<AccountBoxIcon />}
            onClick={() => navigate("/charactersList")}
          >
            Open Website Rick and Morty
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInScreen;
