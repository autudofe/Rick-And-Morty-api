export const addToLocalStorage = (key, data) => {
  localStorage[key] = JSON.stringify(data);
};

export const getFromLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage[key]);
  } catch (e) {
    /*console.log(e)*/
  }
};

export const deleteFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    /*console.log(e)*/
  }
};
