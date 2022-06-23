import React, { useEffect, useState } from "react";

import PaginationPages from "./Content/PaginationPages/PaginationPages";
import Navbar from "./Navbar/Navbar";
import CharactersServices from "../../API/CharactersServices";
import Content from "./Content/Content";
import {useParams} from "react-router-dom";
import {addToLocalStorage, getFromLocalStorage} from "../../helpers/storageServices/storageServices";
import {localStorageKeys} from "../../constants";


const charactersServices = new CharactersServices();

const CharactersList = () => {
    const {param} = useParams();
    const [likesData, setLikesData] = useState({like: [], dislike: []});
    const [like, setLike] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState("");
    const [info, setInfo] = useState();
    const [results, setResults] = useState();

    useEffect(() => {
        const likesData = getFromLocalStorage(localStorageKeys.likes);
        if (likesData) {
            setLikesData(likesData);
    }
  }, []);



    useEffect(() => {
        if (param !== "like" && param !== "dislike") {
            charactersServices.getCharactersData(pageNumber, search).then((r) => {
                setResults(r.data.results);
                setInfo(r.data.info);
            });
        }
    }, [pageNumber, search, param]);


    useEffect(() => {

        let value;
        if (param === "like" && likesData[param].length) {
            value = likesData[param]
        }
        if (param === "dislike" && likesData[param].length) {
            value = likesData[param]
        }

        if (value) {
            charactersServices
                .getCharacter(value)
                .then((r) => {
                    !!r.data.length ?
                        setResults(r.data) : setResults([r.data])
                });
            setInfo(null);
            value = null;
        }
    }, [param, likesData]);

    return (
        <div>
            <Navbar
                likesData={likesData}
                setLikesData={setLikesData}
                results={results}
                setSearch={setSearch}
                setPageNumber={setPageNumber}
            />
            <Content results={results} likesData={likesData} setLikesData={setLikesData}/>
            <PaginationPages
                info={info}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
            />
        </div>
    );
};

export default CharactersList;
