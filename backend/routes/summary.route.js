const router = require("express").Router();
const { ADMIN, USER } = require("../constants/user-roles.constants");
const {
  getAllSummariesRelatedToUser,
  getAllSummariesRelatedToSubject,
  getAllSummaries,
  getSingleSummary,
  createSummary,
  updateSingleSummary,
  deleteSingleSummary,
} = require("../controllers/summary.controller");
const multer = require("multer");

// Set up multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Public Routes
router.get("/user/:id", getAllSummariesRelatedToUser);
router.get("/subject/:id", getAllSummariesRelatedToSubject);
router.get("/", getAllSummaries);
router.get("/:id", getSingleSummary);
router.post("/", upload.single("file"), createSummary);
router.put("/:id", upload.single("file"), updateSingleSummary);
router.delete("/:id", deleteSingleSummary);

//Private Routes

module.exports = router;
