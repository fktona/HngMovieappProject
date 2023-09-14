// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmE3Y2MyMTBlMTY5NTFhYmFhNjg5ZjVlYWYzMmQyMiIsInN1YiI6IjY0ZmU1ZDM0ZTBjYTdmMDBlYzhjMDY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4HftPZ_p_hwAPLIBiHtgGtzbs2u_04elc4xu2dpXLU0'
//   }
// };

// export const resources = async (resourceName, queryParams = {}) => {
//   const apiKey = 'bba7cc210e16951abaa689f5eaf32d22';
  
  
//   const endpoint = `https://api.themoviedb.org/3/${resourceName}?${new URLSearchParams(queryParams)}&api_key=${apiKey}`;

  
  
//   console.log('API URL:', endpoint);

//   try {
//     const response = await fetch(endpoint);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch resource: ${response.status} ${response.statusText}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(`Error fetching ${resourceName}:`, error);
//     throw error; 
//   }
// };


// export const movieDetail = async (id) => { await resources(`movie/` +id)
  
// }

// export const searchResult = async (queryParams = {}) => {
// await resources('search/movie' ,queryParams)

 
// };

// let apiKey;
// let bearerToken;

// // Function to load the access.json module
// async function loadAccessJson() {
//   try {
//     const module = await import('../../access.json');
//     const config = module.default;
//     apiKey = config.apiKey;
//     bearerToken = config.bearerToken;
//     console.log('Config loaded:', config);
//   } catch (error) {
//     console.error('Error loading access.json:', error);
//     apiKey = null;
//     bearerToken = null;
//   }
// }

// // Check if it's local development and load access.json if needed
// const isLocalDevelopment = typeof process !== 'undefined' && process.env.LOAD_IMPORT_LOCALLY === 'true';

// if (isLocalDevelopment) {
//   loadAccessJson();
// } else {
//   apiKey = null;
//   bearerToken = null;
// }

// // Use apiKey and bearerToken in your API requests

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${bearerToken}`
//   }
// };

// export const resources = async (resourceName, queryParams = {}) => {
//   if (!apiKey) {
//     throw new Error('API key is not available.');
//   }

//   const endpoint = `https://api.themoviedb.org/3/${resourceName}?${new URLSearchParams(queryParams)}&api_key=${apiKey}`;

//   console.log('API URL:', endpoint);

//   try {
//     const response = await fetch(endpoint, options);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch resource: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(`Error fetching ${resourceName}:`, error);
//     throw error;
//   }
// };

// export const movieDetail = async (id) => {
//   await resources(`movie/` + id);
// };

// export const searchResult = async (queryParams = {}) => {
//   await resources('search/movie', queryParams);
// };


let config;
const isLocalDevelopment = typeof process !== 'undefined'

let apiKey;
let bearerToken;

async function loadConfig() {
  try {
    if (!isLocalDevelopment) {
      const module = await import('../../access.json');
      config = module.default;
      console.log(config);



      apiKey = config.apiKey;
      bearerToken = config.bearerToken;
    } else {
      config = null;
      apiKey = process.env.apiKey;
      bearerToken = process.env.bearerToken;
    }



  } catch (error) {
    console.error('Error loading access.json:', error);
  }
}



const configPromise = new Promise(async (resolve) => {
  await loadConfig();
  resolve(config);
});

// Now you can access apiKey and bearerToken using the promise
configPromise.then(() => {
  // Continue with other code that may not depend on apiKey or bearerToken
});

export const resources = async (resourceName, queryParams = {}) => {
  // Wait for the configPromise to resolve
  await configPromise;

  const endpoint = `https://api.themoviedb.org/3/${resourceName}?${new URLSearchParams(queryParams)}&api_key=${apiKey}`;

  console.log('API URL:', endpoint);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}` // Add the bearer token to the Authorization header
    }
  };

  try {
    const response = await fetch(endpoint, options);
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

export const movieDetail = async (id) => {
  await resources(`movie/` + id);
};

export const searchResult = async (queryParams = {}) => {
  await resources('search/movie', queryParams);
};
