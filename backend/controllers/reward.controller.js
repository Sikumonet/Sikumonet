const asyncHandler = require("express-async-handler");
const RewardSchema = require("../models/reward.model");
const {
  RATING_WEIGHT,
  DOWNLOAD_WEIGHT,
  FEEDBACK_WEIGHT,
} = require("../constants/rewards.contants");

// @Description  - Get rewards related to user
// @Route - GET /api/v1/reward/user/:id
// @Access - Public
const getRewardRelatedToUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const reward = await RewardSchema.find({
      user: id,
    }).populate("user");
    if (reward.length === 0) {
      res.status(400).json({ message: "Reward not found..!!" });
      throw new Error("Reward not found..!!");
    }
    return res.status(200).json(reward);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Create a reward
// @Route - No end-point to the public usage
// @Access - Public
const createReward = asyncHandler(async (userId) => {
  try {
    const createdReward = await RewardSchema.create({
      ratingScore: 0,
      downloadScore: 0,
      feedbackScore: 0,
      totalScore: 0,
      user: userId,
    });
    if (createdReward) {
      console.log(createdReward);
    } else {
      throw new Error("Invalid reward data..!!");
    }
  } catch (error) {
    console.error(error);
  }
});

// @Description  - Update reward
// @Route - PUT /api/v1/reward/:id
// @Access - Public
const updateSingleReward = asyncHandler(
  async (id, ratingScore, downloadScore, feedbackScore) => {
    try {
      const RATING_WEIGHT = 0.4;
      const DOWNLOAD_WEIGHT = 0.3;
      const FEEDBACK_WEIGHT = 0.3;

      const reward = await RewardSchema.findById({ user: id });
      if (!reward) {
        throw new Error("Reward not found..!!");
      }

      // Calculate updated scores
      const updatedRatingScore = (reward.ratingScore || 0) + (ratingScore || 0);
      const updatedDownloadScore =
        (reward.downloadScore || 0) + (downloadScore || 0);
      const updatedFeedbackScore =
        (reward.feedbackScore || 0) + (feedbackScore || 0);

      // Calculate updated total score
      const updatedTotalScore =
        updatedRatingScore * RATING_WEIGHT +
        updatedDownloadScore * DOWNLOAD_WEIGHT +
        updatedFeedbackScore * FEEDBACK_WEIGHT;

      // Prepare updates based on what's provided
      const updates = {
        ratingScore: updatedRatingScore,
        downloadScore: updatedDownloadScore,
        feedbackScore: updatedFeedbackScore,
        totalScore: updatedTotalScore,
      };

      // Update the reward document with the calculated scores
      const updatedReward = await RewardSchema.findByIdAndUpdate(id, updates, {
        new: true,
      });

      console.log(updatedReward);
      return updatedReward;
    } catch (error) {
      console.error(error);
    }
  }
);

module.exports = {
  getRewardRelatedToUser,
  createReward,
  updateSingleReward,
};
