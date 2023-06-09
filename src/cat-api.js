export { fetchBreeds, fetchCatByBreed };
const USER_API_KEY =
  'live_YzmPQMTStHqghsOEvCcljVLcg6bShd1PQDhCjwz5bCn90IoZy7dVRtO6JaJKN6Gx';

const options = {
  headers: {
    'x-api-key': USER_API_KEY,
  },
};

function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', options)
    .then(response => response.json())
    .then(data => data.map(item => [item.id, item.name]));
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    options
  )
    .then(response => response.json())
    .then(data => ({
      name: data[0].breeds[0].name,
      photoUrl: data[0].url,
      description: data[0].breeds[0].description,
      temperament: data[0].breeds[0].temperament,
    }));
}
