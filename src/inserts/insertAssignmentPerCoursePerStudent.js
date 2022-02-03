const prompt = require("prompt");

const schema = {
  properties: {
    assignmentId: {
      pattern: /\d+/,
      message: "Input assignment Id",
      required: true,
    },
    studentId: {
      pattern: /\d+/,
      message: "Input student id",
      required: true,
    },
    oralMark: {
      pattern: /50|[0-9]?\d/,
      message: "Input oral mark (highest 50)",
      required: true,
    },
    totalMark: {
      pattern: /100|[0-9]?\d/,
      message: "Input total mark (highest 100)",
      required: true,
    },
  },
};

const insertAssignmentPerCoursePerStudent = async (connection) => {
  let sql =
    "Insert into students_assignments(assignments_id, student_id, oral_mark, total_mark) values (?,?,?,?)";

  const conn = await connection();

  prompt.start();
  const { assignmentId, studentId, oralMark, totalMark } = await prompt.get(
    schema
  );

  await conn.query(sql, [assignmentId, studentId, oralMark, totalMark]);
  console.log("One line added");
  await conn.end();
};

module.exports = insertAssignmentPerCoursePerStudent;
