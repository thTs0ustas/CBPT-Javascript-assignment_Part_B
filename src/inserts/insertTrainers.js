const prompt = require("prompt");

const schema = {
  properties: {
    firstName: {
      message: "Input trainer's first name",
      required: true,
    },
    lastName: {
      message: "Input trainer's last name",
      required: true,
    },
    subject: {
      message: "Input trainer's subject",
      required: true,
    },
  },
};

const insertTrainers = async (connection) => {
  let sql =
    "Insert into trainers (first_name, last_name, subject) values (?,?,?)";

  const conn = await connection();

  prompt.start();
  const { firstName, lastName, subject } = await prompt.get(schema);

  await conn.query(sql, [firstName, lastName, subject]);
  console.log("One line added");

  await conn.end();
};

module.exports = insertTrainers;
