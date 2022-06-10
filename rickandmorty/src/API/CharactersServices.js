import axios from "axios";

const { REACT_APP_RICK_AND_MORTY_URL_BASE } = process.env;
export default class CharactersServices {
  async getCharactersData(pageNumber, search) {
    try {
      return await axios.get(
        `${REACT_APP_RICK_AND_MORTY_URL_BASE}/?page=${pageNumber}&name=${search}`
      );
    } catch (e) {
      /*console.log(e);*/
    }
  }

  async getCharacter(id) {
    try {
      return await axios.get(`${REACT_APP_RICK_AND_MORTY_URL_BASE}/${id}`);
    } catch (e) {
      /*console.log(e);*/
    }
  }

  async getPromiseAll(data) {
    try {
      return await axios.all(data.map((item) => axios.get(item)));
    } catch (e) {
      /*console.log(e);*/
    }
  }
}
