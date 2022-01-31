const prompt = require("prompt");

const schema = {
  properties: {
    title: {
      pattern: /^CB\w+-(PT|FT)$/,
      message: "Input course title ex. CBJava-PT",
      required: true,
    },
    stream: {
      message: "Input course stream ex. Java",
      required: true,
    },
    type: {
      pattern: /PT|FT/,
      message: "Input course type ex. PT(Part Time) FT(Full Time)",
      required: true,
    },
    StartDate: {
      message: "Input course starting date - yyyy-mm-dd",
      required: true,
    },
    EndDate: {
      message: "Input course ending date - yyyy-mm-dd",
      required: true,
    },
  },
};

const insertCourses = async (connection) => {
  let sql =
    "Insert into courses (title, stream, type, start_date, end_date) values (?,?,?,?,?)";

  const conn = await connection();

  prompt.start();
  const { title, stream, type, StartDate, EndDate } = await prompt.get(schema);

  await conn.query(sql, [title, stream, type, StartDate, EndDate]);
  console.log("One line added");
  await conn.end();
};

module.exports = insertCourses;
