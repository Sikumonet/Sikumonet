const router = require("express").Router();
const { ADMIN, USER } = require("../constants/user-roles.constants");
const {
  getRearwardRelatedToUser,
} = require("../controllers/rearward.controller");

//Public Routes
router.get("/user/:id", getRearwardRelatedToUser);

//Private Routes

module.exports = router;
