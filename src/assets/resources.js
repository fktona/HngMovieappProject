export const resources = async (resourceName, queryParams = {}) => {
  const apiKey = "bba7cc210e16951abaa689f5eaf32d22";
  const endpoint = `https://api.themoviedb.org/3/${resourceName}?${new URLSearchParams(
    queryParams,
  )}&api_key=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch resource: ${response.status} ${response.statusText}`,
      );
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
  await resources("search/movie", queryParams);
};
