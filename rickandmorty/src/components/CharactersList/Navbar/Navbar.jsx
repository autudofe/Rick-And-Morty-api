import React, {useContext, useEffect} from "react";
import {
  alpha,
  AppBar,
  Autocomplete,
  Box,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import classNames from "classnames";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import {getFromLocalStorage} from "../../../helpers/storageServices/storageServices";
import Avatar from "@mui/material/Avatar";
import {localStorageKeys} from "../../../constants";
import {UserContext} from "../../../App";
import {signOutWithProvider} from "../../../Firebase/Firebase";

const Search = styled("div")(({theme}) => ({
  position: "relative",
  margin: theme.spacing(0, 4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const defaultResults = [];

const Navbar = ({results = defaultResults, setSearch, setPageNumber, likesData, setLikesData}) => {
  const {setUser, user} = useContext(UserContext);
  const {param} = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);


  const resultsOptions = results.map((character, index) => ({
    id: character.id,
    label: character.name,
  }));

  const dataValue = (e) => {
    setPageNumber(1);
    setSearch(e.target.value);
  };


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOut = () => {
    signOutWithProvider(setUser);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const user = getFromLocalStorage(localStorageKeys.user);
    !!user ? setUser(user) : setUser(null)
  }, []);


  return (
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{mr: 2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{flexGrow: 1, display: {xs: "none", sm: "block"}}}
            >
              <NavLink
                  to={`/charactersList`}
                  style={{textDecoration: "none", color: "white"}}
              >
                Rick and Morty
              </NavLink>
            </Typography>

            <Stack spacing={2} sx={{width: 300}}>
              <Search>
                <Autocomplete
                    disableClearable
                    clearOnBlur={false}
                    options={resultsOptions}
                    renderOption={(props, option) => {
                      return (
                          <li {...props} key={option.id}>
                            {option.label}
                          </li>
                      );
                    }}
                    onChange={(e, newValue) => {
                      navigate(`/charactersProfile/${newValue.id}`);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search…"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                            onChange={dataValue}
                        />
                    )}
                />
              </Search>
            </Stack>
            <Box sx={{mx: 1}}>
              <IconButton
                  sx={{pl: 0}}
                  size="large"
                  onClick={() => navigate("/charactersList")}
                  color={classNames({error: !param}, {inherit: param})}
              >
                <HomeIcon/>
              </IconButton>
              <IconButton
                  disabled={!likesData.like.length}
                  sx={{pl: 0}}
                  size="large"
                  onClick={() => navigate("/charactersList/like")}
                  color={classNames(
                      {error: param === "like"},
                      {inherit: param !== "like"}
                  )}
              >
                <ThumbUpIcon/>
              </IconButton>
              <IconButton
                  disabled={!likesData.dislike.length}
                  sx={{pl: 0}}
                  size="large"
                  onClick={() => navigate("/charactersList/dislike")}
                  color={classNames(
                      {error: param === "dislike"},
                      {inherit: param !== "dislike"}
                  )}
              >
                <ThumbDownIcon/>
              </IconButton>
            </Box>

            {!!user ? (
                <div>
                  <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                  >
                    <Avatar alt={user.name} src={user.img}/>
                  </IconButton>
                  <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                  >
                    <MenuItem onClick={handleOut}>Log Out</MenuItem>
                  </Menu>
                </div>
            ) : (
                <Button onClick={() => navigate("/signIn")} color="inherit">
                  Login
                </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
  );
};

export default Navbar;
