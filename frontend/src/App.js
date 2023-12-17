import TextBar from './components/TextBar';
import './App.css';
import SearchBox from './components/SearchBox';
import { GlobalProvider } from './context/GlobalProvider';
import { Container, Stack, Typography } from '@mui/material';
import ColorBox from './components/ColorBox';
import ResultsBox from './components/ResultsBox';
import SizeBox from './components/SizeBox/SizeBox';
import { Directions } from '@mui/icons-material';
import FontFamilyBox from './components/FontFamilyBox';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
      <Container maxWidth="md">
      <Typography fontSize="2rem" >Welcome to EaseWiki!</Typography>
      <br />
      <SearchBox />
      <Stack sx={{flexDirection:'row', columnGap:'20px',marginTop:'20px'}}>
        <ColorBox />
        <SizeBox />
        <FontFamilyBox />
      </Stack>
     
      <ResultsBox />
      </Container>
      
      </GlobalProvider>
     
    </div>
  );
}

export default App;
