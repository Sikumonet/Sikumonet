const mongoose = require("mongoose");

const summarySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the title"],
      trim: true,
    },
    lectureName: {
      type: String,
      required: [true, "Please enter the lecture name"],
      trim: true,
    },
    semester: {
      type: String,
      required: [true, "Please enter the semester"],
      trim: true,
    },
    year: {
      type: String,
      required: [true, "Please enter the year"],
      trim: true,
    },
    file: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    // Relations are going from here
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subjects",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("summaries", summarySchema);
