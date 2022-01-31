const selectStudents = async (connection) => {
  const conn = await connection();
  const sql = "SELECT * FROM students";
  const [rows] = await conn.query(sql);
  await conn.end();
  return rows;
};
module.exports = selectStudents;
