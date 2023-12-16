import TextBar from './components/TextBar';
import './App.css';
import SearchBox from './components/SearchBox';
import { GlobalProvider } from './context/GlobalProvider';
import { Container, Stack } from '@mui/material';
import ColorBox from './components/ColorBox';
import ResultsBox from './components/ResultsBox';
import SizeBox from './components/SizeBox/SizeBox';
import { Directions } from '@mui/icons-material';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
      <Container maxWidth="md">
      Welcome to EaseWiki!
      <SearchBox />
      <Stack sx={{flexDirection:'row', columnGap:'20px'}}>
      <ColorBox />
      <SizeBox />
      </Stack>
     
      <ResultsBox />
      </Container>
      
      </GlobalProvider>
     
    </div>
  );
}

export default App;
