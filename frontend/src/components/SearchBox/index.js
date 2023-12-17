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
        this.stopSpeechRecognition();
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
    const keywords = this.context.state.keywords;

    // Check if keywords are present
    if (keywords) {
        // Construct the API URL with the dynamic keyword
        const apiUrl = `https://easewiki-server.onrender.com/api/wiki/article/${encodeURIComponent(keywords)}`;

        // Make the API call for the main article
        this.context.set({ loading: true });
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
                this.context.set({ loading: false });

                // Make an additional API call for related articles
                const relatedApiUrl = `https://easewiki-server.onrender.com/api/wiki/related/${encodeURIComponent(keywords)}`;
                fetch(relatedApiUrl)
                    .then(relatedResponse => {
                        // Check if the response for related articles is successful (status code 2xx)
                        if (!relatedResponse.ok) {
                            throw new Error('Network response for related articles was not ok');
                        }
                        return relatedResponse.json();
                    })
                    .then(relatedData => {
                        // Update the context with the related articles
                        this.context.set({ relatedArticles: relatedData.articles });
                    })
                    .catch(relatedError => {
                        console.error('Error fetching related articles:', relatedError);
                        // Handle the error for related articles as needed
                        this.context.set({ relatedError: 'An error occurred while fetching related articles.' });
                    });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle the error for the main article as needed
                this.context.set({ error: 'An error occurred while fetching data.', loading: false });
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
    const { keywords } = this.context.state;
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
            value={keywords}
            InputProps={{
              endAdornment: (
                <IconButton onClick={this.startSpeechRecognition}>
                  <MicNoneIcon sx={{ color: 'blue' }} />
                </IconButton>
              ),
            }}
            sx={{flex:1}}
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
