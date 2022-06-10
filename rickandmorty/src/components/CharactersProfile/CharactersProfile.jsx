import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CharactersServices from "../../API/CharactersServices";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {Box} from "@mui/material";
import Container from "@mui/material/Container";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "@mui/material/Button";
import {getFormattedDate} from "../../helpers/other/other";

const charactersServices = new CharactersServices();
const CharactersProfile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);
  const [character, setCharacter] = useState({});

  useEffect(() => {
    charactersServices.getCharacter(id).then((r) => setCharacter(r.data));
  }, []);

  const {image, name, species, gender, location, episode, status, created} =
      character;
  const [episodes, setEpisodes] = useState("");

  useEffect(() => {
    (async () => {
      let response = await charactersServices.getPromiseAll(episode);
      if (response) {
        let result = response.map((value) => value.data.episode).join(", ");
        setEpisodes(result);
      }
    })();
  }, [episode]);

  if (!Object.keys(character).length) return <div>Loading...</div>;
  return (
      <Container sx={{py: 2}} maxWidth="lg">
        <Box sx={{pt: 1, pb: 1, display: "flex", alignItems: "baseline"}}>
          <Button
              size="large"
              onClick={() => navigate("/charactersList")}
              variant="contained"
              startIcon={<KeyboardBackspaceIcon/>}
          >
            Back
          </Button>
        </Box>

        <Grid item xs={12} md={6}>
          <CardActionArea component="a" href="#">
            <Card
                sx={{
                  display: "flex",
                  height: "100%",
                  flexDirection: {xs: "column", sm: "row"},
                  color: "primary.contrastText",
                  backgroundColor: "secondary.main",
                }}
            >
              <CardContent sx={{flex: 1}}>
                <Typography component="h2" variant="h4" fontWeight="bold">
                  {name}
                </Typography>

                <Box
                    sx={{pt: 0, pb: 0, display: "flex", alignItems: "baseline"}}
                >
                  <Typography variant="subtitle1" color="secondary.light">
                    Species:
                  </Typography>
                  <Typography variant="body1" sx={{pl: 1}}>
                    {species}
                  </Typography>
                </Box>

                <Box
                    sx={{pt: 0, pb: 0, display: "flex", alignItems: "baseline"}}
                >
                  <Typography variant="subtitle1" color="secondary.light">
                    Gender:
                  </Typography>
                  <Typography variant="body1" sx={{pl: 1}}>
                    {gender}
                  </Typography>
                </Box>

                <Box
                    sx={{pt: 0, pb: 0, display: "flex", alignItems: "baseline"}}
                >
                  <Typography variant="subtitle1" color="secondary.light">
                    Last known location:
                  </Typography>
                  <Typography variant="body1" sx={{pl: 1}}>
                    {location.name}{" "}
                  </Typography>
                </Box>

                <Box
                    sx={{pt: 0, pb: 0, display: "flex", alignItems: "baseline"}}
                >
                  <Typography variant="subtitle1" color="secondary.light">
                    Episode:
                  </Typography>
                  <Typography variant="body2" sx={{pl: 1}}>
                    {episodes}
                  </Typography>
                </Box>

                <Box
                    sx={{pt: 0, pb: 0, display: "flex", alignItems: "baseline"}}
                >
                  <Typography variant="subtitle1" color="secondary.light">
                    Status:
                  </Typography>
                  <Typography variant="body1" sx={{pl: 1}}>
                    {status}
                  </Typography>
                </Box>

                <Box
                    sx={{pt: 0, pb: 0, display: "flex", alignItems: "baseline"}}
                >
                  <Typography variant="subtitle1" color="secondary.light">
                    Created:
                  </Typography>
                  <Typography variant="body1" sx={{pl: 1}}>
                    {getFormattedDate(created)}
                  </Typography>
                </Box>
              </CardContent>
              <CardMedia
                  component="img"
                  sx={{
                    width: 300,
                    height: 300,
                  }}
                  image={image}
                  alt={name}
              />
            </Card>
          </CardActionArea>
        </Grid>
      </Container>
  );
};

export default CharactersProfile;
