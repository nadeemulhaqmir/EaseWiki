const express =require('express')
const router=express.Router();
const {getArticleData,getRelatedArticles}=require('../controllers/WikiController')

router.route("/article/:query").get(getArticleData)
router.route("/related/:query").get(getRelatedArticles)

module.exports = router;