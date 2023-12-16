const axios = require('axios');

exports.getLanguages = ( async (req, res, next) => {
    const query = req.params.query;
    try { 
      const response = await axios.get(`https://translate.wmcloud.org/api/languages`);
      const data = response.data;
      res.json(data);
    } catch (error) {
      console.error('Error getting languages:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

exports.translateArticle = async (req, res, next) => {
    const { content, sourceLanguage, targetLanguage } = req.body;
    if (!content || !sourceLanguage || !targetLanguage) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    try {
        const response = await axios.post('https://translate.wmcloud.org/api/translate', {
            content,
            format: "text",
            source_language: sourceLanguage,
            target_language: targetLanguage
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        const translatedData = response.data;
        res.json(translatedData);
    } catch (error) {
        console.error('Error translating content:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
