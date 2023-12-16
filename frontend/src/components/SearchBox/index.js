import { Component } from 'react';
import GlobalContext from '../../context/GlobalProvider';
import { Button, IconButton, Stack, TextField } from '@mui/material';
import MicNoneIcon from '@mui/icons-material/MicNone';

import annyang from 'annyang';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.startSpeechRecognition = this.startSpeechRecognition.bind(this);
    this.stopSpeechRecognition = this.stopSpeechRecognition.bind(this);
  }

  componentDidMount() {
    if (annyang) {
      annyang.addCallback('result', (phrases) => {
        const transcript = phrases[0];
        console.log('User said:', transcript);
        this.context.set({ keywords: transcript.trim() });
      });
    }
  }

  componentWillUnmount() {
    if (annyang) {
      annyang.abort();
    }
  }

  startSpeechRecognition() {
    if (annyang) {
      annyang.start();
    }
  }

  stopSpeechRecognition() {
    if (annyang) {
      annyang.abort();
    }
  }

  search() {
    console.log('Search');
  
    const keywords = this.context.state.keywords;
  
    // Check if keywords are present
    if (keywords) {
      // Construct the API URL with the dynamic keyword
      const apiUrl = `http://localhost:5000/api/wiki/article/${encodeURIComponent(keywords)}`;
  
      // Make the API call
      fetch(apiUrl)
        .then(response => {
          // Check if the response is successful (status code 2xx)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Update the context with the API search results
          this.context.set({ results: data });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          // Handle the error as needed, e.g., set an error message in the context
          this.context.set({ error: 'An error occurred while fetching data.' });
        });
    } else {
      // Handle the case where keywords are empty
      console.warn('Keywords are empty. Please enter a search term.');
      // Optionally set an error message in the context
      this.context.set({ error: 'Please enter a search term.' });
    }
  }
  

  speak(text) {
    const speechSynthesis = window.speechSynthesis;

    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  }

  render() {
    console.log('ctx', this.context);
    return (
      <>
        <Stack sx={{ flexDirection: 'row', gap: '5px', justifyContent: 'center' }}>
          <TextField
            size="small"
            placeholder="Search"
            variant="outlined"
            onChange={(e) => {
              this.context.set({ keywords: e.target.value.trim() });
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={this.startSpeechRecognition}>
                  <MicNoneIcon sx={{ color: 'blue' }} />
                </IconButton>
              ),
            }}
          />
          <Button variant="filled" onClick={this.search} sx={{ backgroundColor: '#b0b4fd' }}>
            Search
          </Button>
        </Stack>
      </>
    );
  }
}

SearchBox.contextType = GlobalContext;
export default SearchBox;
