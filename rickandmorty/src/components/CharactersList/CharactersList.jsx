import React, { useEffect, useState } from "react";

import PaginationPages from "./Content/PaginationPages/PaginationPages";
import Navbar from "./Navbar/Navbar";
import CharactersServices from "../../API/CharactersServices";
import Content from "./Content/Content";
import { useParams } from "react-router-dom";
import { getFromLocalStorage } from "../../helpers/storageServices/storageServices";
import { localStorageKeys } from "../../constants";

let likedCharacters ;
let dislikedCharacters ;
const charactersServices = new CharactersServices();

const CharactersList = () => {
  const { param } = useParams();
  const [like, setLike] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [info, setInfo] = useState();
  const [results, setResults] = useState();

  useEffect(() => {
    const likesData = getFromLocalStorage(localStorageKeys.likes);
    if (likesData) {
      setLike(likesData);
    }
  }, []);


  useEffect(() => {
     likedCharacters = [];
     dislikedCharacters = [];
    for (let key in like) {
      like[key] ? likedCharacters.push(key) : dislikedCharacters.push(key);
    }
  }, [like]);


  useEffect(() => {
    if (param !== "like" && param !== "dislike") {
      charactersServices.getCharactersData(pageNumber, search).then((r) => {
        setResults(r.data.results);
        setInfo(r.data.info);
      });
    }
  }, [pageNumber, search, param]);

  useEffect(() => {
    if (param === "like" && likedCharacters.length) {
      charactersServices
        .getCharacter(likedCharacters)
        .then((r) => {
          !!r.data.length?
          setResults(r.data):setResults([r.data])
        });

      setInfo(null);
    }
  }, [param, like]);

  useEffect(() => {
    if (param === "dislike" && dislikedCharacters.length) {
      charactersServices
        .getCharacter(dislikedCharacters)
        .then((r) => {
          !!r.data.length?
              setResults(r.data):setResults([r.data])
        });
      setInfo(null);
    }
  }, [param, like]);

  return (
    <div>
      <Navbar
        results={results}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
      />
      <Content results={results} like={like} setLike={setLike} />
      <PaginationPages
        info={info}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default CharactersList;
