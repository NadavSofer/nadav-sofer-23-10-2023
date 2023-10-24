export const addToLocalStorage = (key, data) => {
  window.localStorage.setItem(key,JSON.stringify(data));
}

export const getFromLocalStorage = (key) => {
  return JSON.parse( window.localStorage.getItem(key) ) || [];
}
