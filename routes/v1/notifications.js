const express = require("express");
const router = express.Router();

const notificationController = require("../../controllers/notification.controller");

router.post('/', notificationController.post);

module.exports = router;
