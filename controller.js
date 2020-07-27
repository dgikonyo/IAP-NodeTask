const { connect } = require("./connctDB");
const { query } = require("express");

connect.connect();

exports.getAllStudents = async (req, res) => {
  try {
    const page = req.query.page;
    const offset = (page - 1) * 10;

    await connect.query(
      "SELECT * FROM student_detail limit 10 OFFSET " + offset,
      (err, results, fields) => {
        if (err) {
          return res.status(500).json({ success: false, error: err });
        } else {
          var jsonResult = {
            products_page_count: results.length,
            page_number: page,
            products: results,
          };
          var myJsonString = JSON.parse(JSON.stringify(jsonResult));

          return res.status(200).json({ myJsonString });
        }
      }
    );
  } catch (error) {
    console.log("Something went wrong " + error);
    return res
      .status(500)
      .json({ success: false, serverError: "Something went wrong " });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { id, name, course } = req.body;

    await connect.query(
      "INSERT INTO student_detail (id, name, course) VALUES (?,?,?)",
      [id, name, course],
      (err, results, fields) => {
        if (err) {
          return res.status(500).json({ success: false, error: err });
        } else {
          return res.status(201).json({ results: results, success: true });
        }
      }
    );
  } catch (error) {
    console.log("Something went wrong " + error);
    return res
      .status(500)
      .json({ success: false, serverError: "Something went wrong " });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const id = req.params.studentId;

    await connect.query(
      "SELECT * FROM student_detail WHERE id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          return res.status(500).json({ success: false, error: err });
        } else {
          return res.status(200).json({ result: results, success: true });
        }
      }
    );
  } catch (error) {
    console.log("Something went wrong " + error);
    return res
      .status(500)
      .json({ success: false, serverError: "Something went wrong " });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const id = req.params.studentId;
    course = req.body.course;

    await connect.query(
      "UPDATE student_detail SET course =? WHERE id = ?",
      [course, id],
      (err, results, fields) => {
        if (err) {
          return res.status(400).json({ success: false, error: err });
        } else {
          return res.status(200).json({ result: results, success: true });
        }
      }
    );
  } catch (error) {
    console.log("Something went wrong " + error);
    return res
      .status(500)
      .json({ success: false, serverError: "Something went wrong " });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    id = req.params.studentId;

    await connect.query(
      "DELETE FROM student_detail WHERE id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          return res.status(400).json({ success: false, error: err });
        } else {
          return res.status(200).json({ result: results, success: true });
        }
      }
    );
  } catch (error) {
    console.log("Something went wrong " + error);
    return res
      .status(500)
      .json({ success: false, serverError: "Something went wrong " });
  }
};