const prompt = require("prompt");

const schema = {
  properties: {
    fee: {
      pattern: /\d+/,
      message: "Input fee",
      required: true,
    },
    studentId: {
      pattern: /\d+/,
      message: "Input student id",
      required: true,
    },
    courseId: {
      pattern: /\d+/,
      message: "Input course id",
      required: true,
    },
  },
};

const insertStudentPerCourse = async (connection) => {
  let sql =
    "Insert into students_courses_connection (fee, course_id, student_id) values (?,?,?)";

  const conn = await connection();

  prompt.start();
  const { fee, studentId, courseId } = await prompt.get(schema);

  await conn.query(sql, [fee, studentId, courseId]);
  console.log("One line added");
  await conn.end();
};

module.exports = insertStudentPerCourse;
