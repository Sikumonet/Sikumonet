const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const institutionRoutes = require("./institution.route");
const degreeProgramRoutes = require("./degree-program.route");
const academicYearRoutes = require("./academic-year.route");
const subjectRoutes = require("./subject.route");
const summaryRoutes = require("./summary.route");
const ratingRoutes = require("./rating.route");
const feedbackRoutes = require("./feedback.route");
const statisticsRoutes = require("./statistics.route");
const libraryRoutes = require("./library.route");
const downloadRoutes = require("./download.route");
const rewardRoutes = require("./reward.route");

//Initialize the all main routes
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/institution", institutionRoutes);
router.use("/degree-program", degreeProgramRoutes);
router.use("/academic-year", academicYearRoutes);
router.use("/subject", subjectRoutes);
router.use("/summary", summaryRoutes);
router.use("/rating", ratingRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/statistics", statisticsRoutes);
router.use("/library", libraryRoutes);
router.use("/download", downloadRoutes);
router.use("reward", rewardRoutes);

module.exports = router;
