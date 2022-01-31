const prompt = require("prompt");

const schema = {
  properties: {
    title: {
      message: "Input assignment title",
      required: true,
    },
    description: {
      message: "Input assignment description",
      required: true,
    },
    deadline: {
      message: "Input assignment deadline",
      required: true,
    },
    courseId: {
      message: "Input assignment's course id",
      required: true,
    },
    course: {
      message: "Input assignment's course",
      required: true,
    },
  },
};

const insertAssignments = async (connection) => {
  let sql =
    "Insert into assignments (title, description, deadline, c_id, course) values (?,?,?,?,?)";

  const conn = await connection();

  prompt.start();
  const { title, description, deadline, courseId, course } = await prompt.get(
    schema
  );

  await conn.query(sql, [title, description, deadline, courseId, course]);
  console.log("One line added");
  await conn.end();
};

module.exports = insertAssignments;
