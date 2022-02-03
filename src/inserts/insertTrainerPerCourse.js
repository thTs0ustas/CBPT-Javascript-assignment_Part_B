const prompt = require("prompt");

const schema = {
  properties: {
    trainerId: {
      pattern: /\d+/,
      message: "Input trainer id",
      required: true,
    },
    subjectId: {
      pattern: /\d+/,
      message: "Input course id",
      required: true,
    },
  },
};

const insertTrainerPerCourse = async (connection) => {
  let sql =
    "Insert into trainer_courses_connection ( trainer_id,subject_id) values (?,?)";

  const conn = await connection();

  prompt.start();
  const { trainerId, subjectId } = await prompt.get(schema);

  await conn.query(sql, [trainerId, subjectId]);
  console.log("One line added");
  await conn.end();
};

module.exports = insertTrainerPerCourse;
