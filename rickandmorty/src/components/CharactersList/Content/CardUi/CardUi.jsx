import React from "react";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { addToLocalStorage } from "../../../../helpers/storageServices/storageServices";
import { localStorageKeys } from "../../../../constants";

const CardUi = ({card: {id, image, name, status}, likesData, setLikesData}) => {


    const addLike = (status) => {
        const newLikesData = {
            ...likesData,
            like: status ? [...likesData.like, id] : [...likesData.like.filter(el => el !== id)],
            dislike: status ? [...likesData.dislike.filter(el => el !== id)] : [...likesData.dislike, id]
        }

        setLikesData(newLikesData)
        addToLocalStorage(localStorageKeys.likes, newLikesData);
    };


    return (
        <Card
            sx={{
                height: "100%",
                width: 280,
                display: "flex",
                flexDirection: "column",
                color: "primary.main",
            }}
        >
            <NavLink
                to={`/charactersProfile/${id}`}
                style={{textDecoration: "none", color: "black"}}
            >
                <CardMedia
                    component="img"
                    height="300"
                    image={image}
                    alt="unsplash image"
                />
                <CardContent sx={{flexGrow: 1, pb: 0, color: "primary"}}>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        color="primary"
                        fontWeight="500"
                    >
                        {name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {status}
                    </Typography>
                </CardContent>
            </NavLink>

            <CardActions disableSpacing>
                <IconButton
                    color="primary"
                    aria-label="add to loved"
                    onClick={() => addLike(true)}
                >
                    {likesData.like.includes(id) ? <ThumbUpIcon/> : <ThumbUpOffAltIcon/>}
                </IconButton>
                <IconButton
                    color="error"
                    aria-label="add to unloved"
                    onClick={() => addLike(false)}
                >
                    {likesData.dislike.includes(id) ? <ThumbDownIcon/> : <ThumbDownOffAltIcon/>
                    }
                </IconButton>
            </CardActions>
        </Card>
  );
};

export default CardUi;
