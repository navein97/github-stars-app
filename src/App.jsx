import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { RepoList } from './components/RepoList';
import './App.css';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RepoList />
    </ThemeProvider>
  );
}

export default App;