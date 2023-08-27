const asyncHandler = require("express-async-handler");
const SummarySchema = require("../models/summary.model");
const RatingSchema = require("../models/rating.model");
const DownloadSchema = require("../models/download.model");
const { decodeJwt } = require("../utils/decode-jwt");
const cloudinary = require("../config/cloudinary.config");
const { extractingFileName } = require("../utils/extracting-file-name");

// @Description  - Get all summaries
// @Route - GET /api/v1/summary
// @Access - Public
const getAllSummaries = asyncHandler(async (req, res) => {
  try {
    const filters = {};

    // Add filters based on query parameters
    if (req.query.title) {
      filters.title = { $regex: req.query.title, $options: "i" };
    }
    if (req.query.academicYear) {
      filters["subject.academicYear.name"] = {
        $regex: req.query.academicYear,
        $options: "i",
      };
    }
    if (req.query.institution) {
      filters["subject.institution.name"] = {
        $regex: req.query.institution,
        $options: "i",
      };
    }
    if (req.query.degreeProgram) {
      filters["subject.degreeProgram.name"] = {
        $regex: req.query.degreeProgram,
        $options: "i",
      };
    }

    console.log(filters);

    const allSummaries = await SummarySchema.find(filters)
      .populate("user")
      .populate({
        path: "subject",
        populate: [
          { path: "academicYear" },
          { path: "institution" },
          { path: "degreeProgram" },
        ],
      });

    // Fetch ratings and downloads counts for each summary
    const summariesWithAnalytics = await Promise.all(
      allSummaries.map(async (summary) => {
        const ratings = await RatingSchema.find({ summary: summary._id });
        const ratingCount = ratings.length;
        const totalRating = ratings.reduce(
          (total, rating) => total + rating.rating,
          0
        );
        const averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;
        const downloadCount = await DownloadSchema.countDocuments({
          summary: summary._id,
        });
        return {
          ...summary.toObject(),
          downloadCount,
          averageRating,
        };
      })
    );

    return res.status(200).json(summariesWithAnalytics);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get all summaries related to user
// @Route - GET /api/v1/summary/user/:id
// @Access - Public
const getAllSummariesRelatedToUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const summaries = await SummarySchema.find({
      user: id,
    })
      .populate("user")
      .populate({
        path: "subject",
        populate: [
          { path: "academicYear" },
          { path: "institution" },
          { path: "degreeProgram" },
        ],
      });
    if (summaries.length === 0) {
      res.status(400).json({ message: "Summaries not found..!!" });
      throw new Error("Summaries not found..!!");
    }
    return res.status(200).json(summaries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get all summaries related to subject
// @Route - GET /api/v1/summary/subject/:id
// @Access - Public
const getAllSummariesRelatedToSubject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const summaries = await SummarySchema.find({
      subject: id,
    })
      .populate("user")
      .populate({
        path: "subject",
        populate: [
          { path: "academicYear" },
          { path: "institution" },
          { path: "degreeProgram" },
        ],
      });
    if (summaries.length === 0) {
      res.status(400).json({ message: "Summaries not found..!!" });
      throw new Error("Summaries not found..!!");
    }
    return res.status(200).json(summaries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get single summary
// @Route - GET /api/v1/summary/:id
// @Access - Public
const getSingleSummary = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const summary = await SummarySchema.findById(id)
      .populate("user")
      .populate({
        path: "subject",
        populate: [
          { path: "academicYear" },
          { path: "institution" },
          { path: "degreeProgram" },
        ],
      });
    if (!summary) {
      res.status(400).json({ message: "Summary not found..!!" });
      throw new Error("Summary not found..!!");
    }
    return res.status(200).json(summary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Create a summary
// @Route - POST /api/v1/summary
// @Access - Public
const createSummary = asyncHandler(async (req, res) => {
  try {
    const { title, lectureName, semester, year, subject } = req.body;
    if (!title || !subject || !lectureName || !semester || !year) {
      res.status(400).json({ message: "Please fill all fields..!!" });
      throw new Error("Please fill all fields..!!");
    }

    const accessToken = req.headers["authorization"];
    const author = decodeJwt(accessToken);

    // Converting the file into string type
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Adding the file into the Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      folder: "summaries",
      overwrite: true,
      access_mode: "public",
    });

    const createdSummary = await SummarySchema.create({
      title,
      lectureName,
      semester,
      year,
      file: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      user: author.id,
      subject: subject,
    });
    if (createdSummary) {
      res.status(201).json(createdSummary);
    } else {
      res.status(400).json({ message: "Invalid summary data..!!" });
      throw new Error("Invalid summary data..!!");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Update single summary
// @Route - PUT /api/v1/summary/:id
// @Access - Public
const updateSingleSummary = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, lectureName, semester } = req.body;
    const summary = await SummarySchema.findById(id);
    if (!summary) {
      res.status(400).json({ message: "Summary not found..!!" });
      throw new Error("Summary not found..!!");
    }

    console.log("DEBUG : ", summary.file.public_id);

    //Updating the data partially
    const updates = {};
    if (title) {
      updates.title = title;
    }
    if (lectureName) {
      updates.lectureName = lectureName;
    }
    if (semester) {
      updates.semester = semester;
    }
    if (req.file) {
      // Converting the file into string type
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      // Adding the file into the Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: "auto",
        folder: "summaries",
        public_id: `${extractingFileName(summary.file.public_id)}`,
        overwrite: true,
        access_mode: "public",
      });
      updates.file = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Saving updating data into the database
    const updatedSummary = await SummarySchema.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return res.status(200).json(updatedSummary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Delete single summary
// @Route - DELETE /api/v1/summary/:id
// @Access - Public
const deleteSingleSummary = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const summary = await SummarySchema.findById(id);
    if (!summary) {
      res.status(400).json({ message: "Summary not found..!!" });
      throw new Error("Summary not found..!!");
    }
    await SummarySchema.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Summary deleted successfully..!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllSummariesRelatedToUser,
  getAllSummariesRelatedToSubject,
  getAllSummaries,
  getSingleSummary,
  createSummary,
  updateSingleSummary,
  deleteSingleSummary,
};
