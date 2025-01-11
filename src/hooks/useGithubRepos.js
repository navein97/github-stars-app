import { useState, useEffect } from 'react';
import { fetchGithubRepos } from '../services/githubApi';

export const useGithubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRepos();
  }, [page]);

  const loadRepos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchGithubRepos(page);
      setRepos(prevRepos => [...prevRepos, ...response.items]);
      setHasMore(response.items.length > 0);
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'An error occurred while fetching repositories. Please try again later.'
      );
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return { repos, loading, initialLoading, hasMore, loadMore, error };
};