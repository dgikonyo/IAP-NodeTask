const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("./controller");

//define actions on the / route
router.route("/").get(getAllStudents).post(addStudent);

router
  .route("/:studentId")
  .get(getStudent)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;