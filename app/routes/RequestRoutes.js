const express = require("express");
const router = express.Router();
const RequestController = require("../http/controller/RequestController");
const Auth = require("../http/middleware/Auth");



router.get('/api/citysearch',RequestController.citySearch);





module.exports = router;