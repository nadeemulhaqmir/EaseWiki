const express = require('express')
const router=express.Router();
const {getLanguages, translateArticle}=require('../controllers/WikiTranslator')

router.route("/languages/").get(getLanguages)
router.route("/translate/").post(translateArticle)

module.exports = router;