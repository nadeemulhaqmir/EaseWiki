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
  const contributors = [
    { name: 'Mohan Sai Krishna M', linkedIn: 'https://www.linkedin.com/in/mohan-sai-krishna-mopada-16853b213/' },
    { name: 'Nadeem Ul Haq', linkedIn: 'https://www.linkedin.com/in/nadeem-ul-haq-mir-b10baa189/' },

  ];

  return (
    <div className="App">
      <GlobalProvider>
        <Container maxWidth="md">
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <h1 style={{ fontSize: '3rem', color: '#007BFF', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
              Welcome to EaseWiki!
            </h1>
          </div>
          <br />
          <SearchBox />
          <Stack sx={{ flexDirection: 'row', columnGap: '20px', marginTop: '20px' }}>
            <ColorBox />
            <SizeBox />
            <FontFamilyBox />
          </Stack>

          <ResultsBox />

          <p style={{ textAlign: 'center', marginTop: '20px', fontStyle: 'italic' }}>
            Developed by <a href='https://www.linkedin.com/in/mohan-sai-krishna-mopada-16853b213/'>Mohan </a>
            & <a href='https://www.linkedin.com/in/nadeem-ul-haq-mir-b10baa189/'>Nadeem</a> with passion as part of the WikiMedia Hackathon.

          </p>
        </Container>

      </GlobalProvider>

    </div>
  );
}

export default App;
