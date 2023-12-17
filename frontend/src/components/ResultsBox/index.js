import { Component, createRef } from "react";
import GlobalContext from "../../context/GlobalProvider";
import { CircularProgress, IconButton, MenuItem, Select, Stack, Typography } from "@mui/material";
import { Campaign } from "@mui/icons-material";

import "./index.css";
import Dyslexia from "react-dyslexia";

class ResultsBox extends Component {
   constructor(props) {
      super(props);
      this.state = { language: 'en' };
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

   translate(e) {
      const tL = e.target.value;
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
      const color = this.context.state.color;
      const size = this.context.state.size;
      const fontFamily = this.context.state.fontFamily;
      return <>
         {
            this.context.state.loading ? <Stack sx={{ alignItems: 'center', marginTop: '20px' }}><CircularProgress /></Stack>
               :
               <Stack sx={{ fontFamily }}>
                  <div style={{ fontSize: size + 'rem', color, margin: '10px 0px' }}>
                     {
                       fontFamily==='OpenDyslexic' ?  <Dyslexia delay={1000} text={results} />
                        : results
                     }

                  </div>
                  {
                     results && <Stack sx={{ alignItems: 'end', flexDirection: 'row', justifyContent: 'flex-end', gap: '5px' }}>
                        <IconButton onClick={this.toggleAudio} ><Campaign /></IconButton>
                        <Select ref={this.targetLanguage} onChange={this.translate} size="small" value={this.state.language}>
                           {
                              this.languages.map((l, k) => { return <MenuItem key={k} value={l.code}>{l.title}</MenuItem> })
                           }
                        </Select>

                     </Stack>
                  }
                  <br />

                  {
                     Array.isArray(relatedArticles) && relatedArticles.length > 0 && <>
                        <Typography sx={{ color, fontSize: size + 0.2 + 'rem', fontWeight: 500 }}>Related Articles:</Typography>
                        <ul className="related-articles" style={{ color, fontSize: size + 'rem' }}>
                           {
                              relatedArticles.map((article, k) => {
                                 return <li key={k}><a href={article.link} style={{ color }}>{article.title}</a></li>
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