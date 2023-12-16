const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const dotenv = require('dotenv');
const wiki = require('./routes/Wiki');
const translate = require('./routes/Translate');
const bodyParser = require('body-parser');

dotenv.config({path: 'config/config.env'})

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/wiki',wiki);
app.use('/api/translator',translate);

app.get('/', async (req, res) => {
res.send('EaseWiki Server');
});

app.listen(process.env.PORT,() =>{
  console.log(`server started on port:${process.env.PORT}`)
})
