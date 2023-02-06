import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '33190219-0860edc2b5cf578f738ea4f26';

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

// ============= variant with fetch
// const API_KEY = '33190219-0860edc2b5cf578f738ea4f26';

// function fetchImg(key, value) {
//   return axios.get('https://pixabay.com/api/', {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     params: {
//       key: `${API_KEY}`,
//       q: `${value}`,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       per_page: 40,
//     },
//   });
// }

// export { API_KEY, fetchImg, page };
