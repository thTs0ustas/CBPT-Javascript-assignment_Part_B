const selectCourses = async (connection) => {
  const conn = await connection();
  const sql = "SELECT * FROM courses";
  const [rows] = await conn.query(sql);
  await conn.end();
  return rows;
};
module.exports = selectCourses;
