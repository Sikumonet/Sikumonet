const asyncHandler = require("express-async-handler");
const FeedbackSchema = require("../models/feedback.model");
const SummarySchema = require("../models/summary.model");
const { decodeJwt } = require("../utils/decode-jwt");
const { updateSingleReward } = require("./reward.controller");

// @Description  - Get all feedbacks
// @Route - GET /api/v1/feedback
// @Access - Public
const getAllFeedbacks = asyncHandler(async (req, res) => {
  try {
    const allFeedbacks = await FeedbackSchema.find();
    return res.status(200).json(allFeedbacks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get all feedbacks related to summary
// @Route - GET /api/v1/feedback/summary/:id
// @Access - Public
const getAllFeedbacksRelatedToSummary = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await FeedbackSchema.find({
      summary: id,
    }).populate("user");
    if (feedback.length === 0) {
      res.status(400).json({ message: "Feedback not found..!!" });
      throw new Error("Feedback not found..!!");
    }
    return res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get single feedback
// @Route - GET /api/v1/feedback/:id
// @Access - Public
const getSingleFeedback = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await FeedbackSchema.findById(id);
    if (!feedback) {
      res.status(400).json({ message: "Feedback not found..!!" });
      throw new Error("Feedback not found..!!");
    }
    return res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Create a feedback
// @Route - POST /api/v1/feedback
// @Access - Public
const createFeedback = asyncHandler(async (req, res) => {
  try {
    const { content, summary } = req.body;
    if (!content || !summary) {
      res.status(400).json({ message: "Please fill all fields..!!" });
      throw new Error("Please fill all fields..!!");
    }
    const accessToken = req.headers["authorization"];
    const author = decodeJwt(accessToken);

    const existingFeedback = await FeedbackSchema.findOne({
      summary: summary,
      user: author.id,
    });

    if (existingFeedback) {
      res.status(400).json({
        message: "You have already provided feedback for this summary.",
      });
      throw new Error("You have already provided feedback for this summary.");
    } else {
      const summaryData = await SummarySchema.findById(summary).populate(
        "user"
      );
      const createdFeedback = await FeedbackSchema.create({
        content: content,
        user: author.id,
        summary: summary,
        summaryAuthor: summaryData.user._id,
      });
      if (createdFeedback) {
        // const rewardsFeedbacks = await updateSingleReward(
        //   summaryData.user._id,
        //   null,
        //   null,
        //   1
        // );
        // console.log("rewardsFeedbacks : ", rewardsFeedbacks);
        res.status(201).json(createdFeedback);
      } else {
        res.status(400).json({ message: "Invalid feedback data..!!" });
        throw new Error("Invalid feedback data..!!");
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Update single feedback
// @Route - PUT /api/v1/feedback/:id
// @Access - Public
const updateSingleFeedback = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const feedback = await FeedbackSchema.findById(id);
    if (!feedback) {
      res.status(400).json({ message: "Feedback not found..!!" });
      throw new Error("Feedback not found..!!");
    }
    const updates = {
      content,
    };
    const updatedFeedback = await FeedbackSchema.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
      }
    );
    return res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Delete single feedback
// @Route - DELETE /api/v1/feedback/:id
// @Access - Public
const deleteSingleFeedback = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await FeedbackSchema.findById(id);
    if (!feedback) {
      res.status(400).json({ message: "Feedback not found..!!" });
      throw new Error("Feedback not found..!!");
    }
    await FeedbackSchema.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Feedback deleted successfully..!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllFeedbacks,
  getAllFeedbacksRelatedToSummary,
  getSingleFeedback,
  createFeedback,
  updateSingleFeedback,
  deleteSingleFeedback,
};
