import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '33411658-9504db49656fc0db308898fd3';

export async function fetchImg(query, page, perPage) {
  try {
    const response = await axios.get(
      `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
}
