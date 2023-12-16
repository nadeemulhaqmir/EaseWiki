import TextBar from './components/TextBar';
import './App.css';
import SearchBox from './components/SearchBox';
import { GlobalProvider } from './context/GlobalProvider';
import { Container } from '@mui/material';
import ColorBox from './components/ColorBox';
import ResultsBox from './components/ResultsBox';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
      <Container maxWidth="md">
      Welcome to EaseWiki!
      <SearchBox />
      <ColorBox />
      
      <ResultsBox />
      </Container>
      
      </GlobalProvider>
     
    </div>
  );
}

export default App;
