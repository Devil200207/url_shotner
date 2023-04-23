const express = require("express");
const {GenerateUrl} = require('../controllers/url');

const router = express.Router();

router.post('/', GenerateUrl);

module.exports = router;