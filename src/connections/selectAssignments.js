const selectAssignments = async (connection) => {
  const conn = await connection();
  const sql = "SELECT * FROM assignments";
  const [rows] = await conn.query(sql);
  await conn.end();
  return rows;
};

module.exports = selectAssignments;
