import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/search/repositories';

export const fetchGithubRepos = async (page) => {
  const date = new Date();
  date.setDate(date.getDate() - 10);
  const formattedDate = date.toISOString().split('T')[0];

  const response = await axios.get(
    `${GITHUB_API_URL}?q=created:>${formattedDate}&sort=stars&order=desc&page=${page}`
  );

  return response.data;
};