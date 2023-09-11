const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmE3Y2MyMTBlMTY5NTFhYmFhNjg5ZjVlYWYzMmQyMiIsInN1YiI6IjY0ZmU1ZDM0ZTBjYTdmMDBlYzhjMDY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4HftPZ_p_hwAPLIBiHtgGtzbs2u_04elc4xu2dpXLU0'
  }
};

export const resources = async (resourceName, queryParams = {}) => {
  const apiKey = 'bba7cc210e16951abaa689f5eaf32d22';
  
  
  const endpoint = `https://api.themoviedb.org/3/${resourceName}?${new URLSearchParams(queryParams)}&api_key=${apiKey}`;

  
  
  console.log('API URL:', endpoint);

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch resource: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${resourceName}:`, error);
    throw error; 
  }
};

export const topRatedMovies = await resources('movie/top_rated', { page: 1 });  

export const movieDetail = async (id) => { await resources(`movie/` +id)
  
}

export const nowPlayingMovies = await resources('movie/now_playing', { page: 1 }); 

export const searchResult = async (queryParams = {}) => {
await resources('search/movie' ,queryParams)

 
};
