import { Card, CardContent, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export const RepoCard = ({ repo }) => {
  return (
    <Box sx={{ 
      py: 2, 
      borderBottom: '1px solid #eee',
    }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        {repo.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {repo.description || 'No description available'}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          {repo.owner.login}
        </Typography>
        <Box display="flex" alignItems="center">
          <StarIcon sx={{ color: '#FFD700', mr: 0.5, fontSize: '1.2rem' }} />
          <Typography variant="body2">
            {repo.stargazers_count.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};