const selectTrainers = async (connection) => {
  const conn = await connection();
  const sql = "SELECT * FROM trainers";
  const [rows] = await conn.query(sql);
  await conn.end();
  return rows;
};

module.exports = selectTrainers;
