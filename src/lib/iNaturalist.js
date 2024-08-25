import axios from 'axios';

const iNaturalistAPI = 'https://api.inaturalist.org/v1/observations';

export const fetchObservations = async (species) => {
  try {
    const response = await axios.get(iNaturalistAPI, {
      params: {
        q: species,
        per_page: 100,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching data from iNaturalist API', error);
    return [];
  }
};
