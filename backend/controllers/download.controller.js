const asyncHandler = require("express-async-handler");
const DownloadSchema = require("../models/download.model");
const SummarySchema = require("../models/summary.model");
const { decodeJwt } = require("../utils/decode-jwt");
const { updateSingleReward } = require("./reward.controller");

// @Description  - Get all downloads
// @Route - GET /api/v1/download
// @Access - Public
const getAllDownloads = asyncHandler(async (req, res) => {
  try {
    const allDownloads = await DownloadSchema.find();
    return res.status(200).json(allDownloads);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get all downloads related to user
// @Route - GET /api/v1/download/user/:id
// @Access - Public
const getAllDownloadsRelatedToUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const download = await DownloadSchema.find({
      user: id,
    })
      .populate("user")
      .populate("summary")
      .populate("summaryAuthor");
    if (download.length === 0) {
      res.status(400).json({ message: "Download not found..!!" });
      throw new Error("Download not found..!!");
    }
    return res.status(200).json(download);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get all downloads related to summary
// @Route - GET /api/v1/download/summary/:id
// @Access - Public
const getAllDownloadsRelatedToSummary = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const download = await DownloadSchema.find({
      summary: id,
    })
      .populate("user")
      .populate("summary")
      .populate("summaryAuthor");
    if (download.length === 0) {
      res.status(400).json({ message: "Download not found..!!" });
      throw new Error("Download not found..!!");
    }
    return res.status(200).json(download);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Create a download
// @Route - POST /api/v1/download
// @Access - Public
const createDownload = asyncHandler(async (req, res) => {
  try {
    const { summary } = req.body;
    console.log("summary : ", summary);
    if (!summary) {
      res.status(400).json({ message: "Please fill all fields..!!" });
      throw new Error("Please fill all fields..!!");
    }
    const accessToken = req.headers["authorization"];
    const author = decodeJwt(accessToken);

    const summaryFromDB = await SummarySchema.findOne({
      _id: summary,
    }).populate("user");
    if (summaryFromDB.user._id === author.id) {
      res.status(400).json({
        message:
          "Download can not be count because of summary author is you..!!",
      });
      throw new Error(
        "Download can not be count because of summary author is you..!!"
      );
    }

    const existingDownload = await DownloadSchema.findOne({
      summary: summary,
      user: author.id,
    });

    if (!existingDownload) {
      const summaryData = await SummarySchema.findById(summary).populate(
        "user"
      );
      const createdDownload = await DownloadSchema.create({
        user: author.id,
        summary: summary,
        summaryAuthor: summaryData.user._id,
      });
      if (createdDownload) {
        // const rewardsDownloads = await updateSingleReward(
        //   summaryData.user._id,
        //   null,
        //   1,
        //   null
        // );
        // console.log("rewardsDownloads : ", rewardsDownloads);
        res.status(201).json(createdDownload);
      } else {
        res.status(400).json({ message: "Invalid download data..!!" });
        throw new Error("Invalid download data..!!");
      }
    }
    res.status(400).json({ message: "Download statistics already added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllDownloads,
  getAllDownloadsRelatedToUser,
  getAllDownloadsRelatedToSummary,
  createDownload,
};
