const express = require("express");
const { getAllRooms } = require("../controllers/roomController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getAllRooms);

module.exports = router;
