import { useEffect, useRef, useCallback } from 'react';
import { Box, CircularProgress, Container, Typography, Alert } from '@mui/material';
import { RepoCard } from './RepoCard';
import { useGithubRepos } from '../hooks/useGithubRepos';

export const RepoList = () => {
  const { repos, loading, hasMore, loadMore, error, initialLoading } = useGithubRepos();
  const observer = useRef();

  const lastRepoElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Trending GitHub Repositories
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4, color: 'text.secondary' }}>
        Most starred repositories from the last 10 days
      </Typography>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Initial Loading */}
      {initialLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <>
          {/* Repository List */}
          {repos.map((repo, index) => (
            <div
              key={repo.id}
              ref={index === repos.length - 1 ? lastRepoElementRef : undefined}
            >
              <RepoCard repo={repo} />
            </div>
          ))}

          {/* Pagination Loading */}
          {loading && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress />
            </Box>
          )}

          {/* No Results Message */}
          {!loading && repos.length === 0 && (
            <Alert severity="info">
              No repositories found.
            </Alert>
          )}
        </>
      )}
    </Container>
  );
};