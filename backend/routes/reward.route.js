const router = require("express").Router();
const { ADMIN, USER } = require("../constants/user-roles.constants");
const { getRewardRelatedToUser } = require("../controllers/reward.controller");

//Public Routes
router.get("/user/:id", getRewardRelatedToUser);

//Private Routes

module.exports = router;
