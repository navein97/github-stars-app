import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { RepoList } from './components/RepoList';

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Mobile container wrapper */}
      <Box 
        sx={{ 
          maxWidth: '480px', // typical mobile width
          margin: '0 auto',
          height: '100vh',
          backgroundColor: 'white',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
        }}
      >
        <RepoList />
      </Box>
    </ThemeProvider>
  );
}

export default App;