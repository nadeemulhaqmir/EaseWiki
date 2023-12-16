import { Component, createRef } from "react";
import GlobalContext from "../../context/GlobalProvider";
import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { Campaign } from "@mui/icons-material";

class ResultsBox extends Component {
   constructor(props) {
      super(props);
      this.sourceLanguage = createRef();
      this.targetLanguage = createRef();
      this.toggleAudio = this.toggleAudio.bind(this);
      this.translate = this.translate.bind(this);
      this.languages = [
        { title: 'English', code: 'en' },
        { title: 'Hindi', code: 'hi' },
        { title: 'Tamil', code: 'ta' },
        { title: 'Urdu', code: 'ur' },
      ];
      this.utterance = null;
   }

   toggleAudio() {
      const { results, sourceLanguage } = this.context.state;

      if (results && sourceLanguage) {
         if (this.utterance && window.speechSynthesis.speaking) {
            // Stop speaking if already speaking
            window.speechSynthesis.cancel();
         } else {
            // Start speaking if not speaking
            this.utterance = new SpeechSynthesisUtterance(results);
            this.utterance.lang = sourceLanguage;
            this.utterance.onend = () => {
               console.log('Speech synthesis finished.');
            };

            const speechSynthesis = window.speechSynthesis;
            if (speechSynthesis) {
               speechSynthesis.speak(this.utterance);
            }
         }
      } else {
         console.warn('Results or source language is missing.');
      }
   }

   translate() {
      const tL = this.targetLanguage.current.value;
      const translationApiUrl = `http://localhost:5000/api/translator/translate`;
      const translationRequestBody = {
         content: this.context.state.results,
         sourceLanguage: this.context.state.sourceLanguage,
         targetLanguage: tL
      };

      fetch(translationApiUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(translationRequestBody),
      })
         .then(response => {
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            return response.json();
         })
         .then(data => {
            console.log(data);
            this.context.set({ results: data.translation });
            this.context.set({ sourceLanguage: tL });
            this.context.set({ targetLanguage: "" });
         })

   }

   render() {
      const relatedArticles = this.context.state.relatedArticles;
      const results = this.context.state.results;
      return <>
         {
            this.context.state.loading ? <Stack sx={{ alignItems: 'center', marginTop: '20px' }}><CircularProgress /></Stack>
               :
               <Stack>
                  <div style={{ fontSize: this.context.state.size + 'rem' }}>
                     {results}
                  </div>
                  {
                     results && <Stack sx={{ alignItems: 'end', flexDirection: 'row' }}>
                        <select ref={this.targetLanguage} onChange={this.translate}>
                           {
                              this.languages.map((l, k) => { return <option key={k} value={l.code}>{l.title}</option> })
                           }
                        </select>
                        <IconButton onClick={this.toggleAudio} ><Campaign /></IconButton>
                     </Stack>
                  }
                  {
                     Array.isArray(relatedArticles) && relatedArticles.length > 0 && <>
                        <Typography>Related Articles:</Typography>
                        <ul>
                           {
                              relatedArticles.map((article, k) => {
                                 return <li key={k}><a href={article.link}>{article.title}</a></li>
                              })
                           }
                        </ul>
                     </>
                  }
               </Stack>

         }

      </>

   }
}

ResultsBox.contextType = GlobalContext;
export default ResultsBox;