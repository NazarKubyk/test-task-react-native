const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export const fetchData = (url: string) => {
  return fetch(BASE_URL + url).then((res) => res.json())
};