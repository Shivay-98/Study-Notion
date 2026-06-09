const express = require("express");
const router = express.Router();

const { auth, isInstructor, isAdmin } = require("../middlewares/auth");

// Category Controllers
const {
  createCategory,
  showAllCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// Course Controllers
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
} = require("../controllers/Course");

// Section Controllers
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// SubSection Controllers
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

// Rating & Review Controllers
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

// // Course Progress Controllers
// const {
//   updateCourseProgress,
// } = require("../controllers/CourseProgress");

// ================= CATEGORY ROUTES =================

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategory);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ================= COURSE ROUTES =================

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getAllCourses", showAllCourses);
router.post("/getCourseDetails", getCourseDetails);

// router.put("/editCourse", auth, isInstructor, editCourse);
// router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

// ================= SECTION ROUTES =================

router.post("/addSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);

// ================= SUBSECTION ROUTES =================

router.post("/addSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

// ================= RATING & REVIEW ROUTES =================

router.post("/createRating", auth, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

// ================= COURSE PROGRESS ROUTES =================

router.post("/updateCourseProgress", auth, updateCourseProgress);

module.exports = router;