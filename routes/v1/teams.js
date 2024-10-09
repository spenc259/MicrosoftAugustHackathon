const express = require("express");
const router = express.Router();

const teamsController = require("../../controllers/teams.controller");

router.get("/", teamsController.get);
router.post("/channels", teamsController.getChannels);
router.post("/subscription", teamsController.createSubscription);

module.exports = router;
