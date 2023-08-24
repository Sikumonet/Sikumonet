const mongoose = require("mongoose");

const rewardSchema = mongoose.Schema(
  {
    ratingScore: {
      type: Number,
      required: [false],
      default: 0,
    },
    downloadScore: {
      type: Number,
      required: [false],
      default: 0,
    },
    feedbackScore: {
      type: Number,
      required: [false],
      default: 0,
    },
    totalScore: {
      type: Number,
      required: [false],
      default: 0,
    },
    // Relations are going from here
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rewards", rewardSchema);
