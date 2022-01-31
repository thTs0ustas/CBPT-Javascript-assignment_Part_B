const prompt = require("prompt");

const schema = {
  properties: {
    firstName: {
      message: "Input student's first name",
      required: true,
    },
    lastName: {
      message: "Input student's last name",
      required: true,
    },
    dateOfBirth: {
      message: "Input student's date of birth",
      required: true,
    },
  },
};

const insertStudents = async (connection) => {
  let sql =
    "Insert into students (first_name, last_name, date_of_birth) values (?,?,?)";

  const conn = await connection();

  prompt.start();
  const { firstName, lastName, dateOfBirth } = await prompt.get(schema);

  await conn.query(sql, [firstName, lastName, dateOfBirth]);
  console.log("One line added");
  await conn.end();
};

module.exports = insertStudents;
