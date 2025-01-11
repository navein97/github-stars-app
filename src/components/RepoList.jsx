import { useEffect, useRef, useCallback } from 'react';
import { Box, CircularProgress, Typography, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import { RepoCard } from './RepoCard';
import { useGithubRepos } from '../hooks/useGithubRepos';

export const RepoList = () => {
  const { repos, loading, hasMore, loadMore } = useGithubRepos();
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          p: 2, 
          borderBottom: '1px solid #eee',
          textAlign: 'center',
          backgroundColor: 'white',
          zIndex: 1
        }}
      >
        Trending Repos
      </Typography>

      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        px: 2,
        pb: 7 // Space for bottom navigation
      }}>
        {repos.map((repo, index) => (
          <div
            key={repo.id}
            ref={index === repos.length - 1 ? lastRepoElementRef : undefined}
          >
            <RepoCard repo={repo} />
          </div>
        ))}
        {loading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}
      </Box>

      <Paper 
        sx={{ 
          position: 'absolute',  // Changed from fixed to absolute
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%'
        }} 
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction 
            label="Trending" 
            icon={<StarIcon sx={{ color: '#1976d2' }} />} 
            sx={{ flex: 1 }}
          />
          <BottomNavigationAction 
            label="Settings" 
            icon={<SettingsIcon />} 
            sx={{ flex: 1 }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};