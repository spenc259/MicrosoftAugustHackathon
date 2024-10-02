const express = require("express");
const router = express.Router();

const teamsController = require('../../controllers/teams.controller');

router.get("/", teamsController.get);
router.post("/", teamsController.post);

module.exports = router;
