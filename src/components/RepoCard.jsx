import { Card, CardContent, Avatar, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export const RepoCard = ({ repo }) => {
  return (
    <Card sx={{ mb: 2, width: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={repo.owner.avatar_url} alt={repo.owner.login} sx={{ mr: 2 }} />
          <Typography variant="subtitle1">{repo.owner.login}</Typography>
        </Box>
        <Typography variant="h6" gutterBottom>
          {repo.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {repo.description || 'No description available'}
        </Typography>
        <Box display="flex" alignItems="center">
          <StarIcon sx={{ color: 'gold', mr: 1 }} />
          <Typography variant="body2">
            {repo.stargazers_count.toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};