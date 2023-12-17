const axios = require('axios');

exports.getArticleData = ( async (req, res, next) => {
    const query = req.params.query;
    try { 
      const response = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${query}&formatversion=2&exsentences=10&exlimit=1&explaintext=1`);
      const data = response.data.query.pages[0].extract;
      res.json(data);
    } catch (error) {
      console.error('Error fetching Wikipedia article:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

exports.getRelatedArticles = ( async (req, res, next) => {
    const query = req.params.query;
    try {
      const response = await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&format=json`);
      const data = response.data;
      
      const titles = response.data[1];
      const links = response.data[3];
      const length = titles.length;
      
      const jsonObject = {
        count: length,
        articles: []
      };
      
      // Populate the JSON object with titles and corresponding links
      for (let i = 0; i < length; i++) {
        const item = {
          title: titles[i],
          link: links[i]
        };
        jsonObject.articles.push(item);
      }
      res.json(jsonObject);

    } catch (error) {
      console.error('Error fetching Wikipedia article:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
} );
