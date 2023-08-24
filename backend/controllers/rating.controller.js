const asyncHandler = require("express-async-handler");
const RatingSchema = require("../models/rating.model");
const SummarySchema = require("../models/summary.model");
const { decodeJwt } = require("../utils/decode-jwt");
const { updateSingleReward } = require("./reward.controller");

// @Description  - Get all rating
// @Route - GET /api/v1/rating
// @Access - Public
const getAllRatings = asyncHandler(async (req, res) => {
  try {
    const allRatings = await RatingSchema.find();
    return res.status(200).json(allRatings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get all ratings related to summary
// @Route - GET /api/v1/rating/summary/:id
// @Access - Public
const getAllRatingsRelatedToSummary = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const ratings = await RatingSchema.find({
      summary: id,
    }).populate("user");
    if (ratings.length === 0) {
      res.status(400).json({ message: "Ratings not found..!!" });
      throw new Error("Ratings not found..!!");
    }
    return res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get single rating
// @Route - GET /api/v1/rating/:id
// @Access - Public
const getSingleRating = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await RatingSchema.findById(id);
    if (!rating) {
      res.status(400).json({ message: "Rating not found..!!" });
      throw new Error("Rating not found..!!");
    }
    return res.status(200).json(rating);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Create a rating
// @Route - POST /api/v1/rating
// @Access - Public
const createRating = asyncHandler(async (req, res) => {
  try {
    const { rating, summary } = req.body;
    if (!rating || !summary) {
      res.status(400).json({ message: "Please fill all fields..!!" });
      throw new Error("Please fill all fields..!!");
    }

    const accessToken = req.headers["authorization"];
    const author = decodeJwt(accessToken);

    const existingRating = await RatingSchema.findOne({
      summary: summary,
      user: author.id,
    });
    if (existingRating) {
      res.status(400).json({
        message: "You have already provided rating for this summary.",
      });
      throw new Error("You have already provided rating for this summary.");
    } else {
      const summaryData = await SummarySchema.findById(summary).populate(
        "user"
      );
      const createdRating = await RatingSchema.create({
        rating: rating,
        summary: summary,
        user: author.id,
        summaryAuthor: summaryData.user._id,
      });
      if (createdRating) {
        const rewardsRating = await updateSingleReward(
          summaryData.user._id,
          rating,
          null,
          null
        );
        console.log("rewardsRating : ", rewardsRating);
        res.status(201).json(createdRating);
      } else {
        res.status(400).json({ message: "Invalid rating data..!!" });
        throw new Error("Invalid rating data..!!");
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Delete single rating
// @Route - DELETE /api/v1/rating/:id
// @Access - Public
const deleteSingleRating = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await RatingSchema.findById(id);
    if (!rating) {
      res.status(400).json({ message: "Rating not found..!!" });
      throw new Error("Rating not found..!!");
    }
    await RatingSchema.findByIdAndDelete(id);
    return res.status(200).json({ message: "Rating deleted successfully..!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllRatings,
  getAllRatingsRelatedToSummary,
  getSingleRating,
  createRating,
  deleteSingleRating,
};
