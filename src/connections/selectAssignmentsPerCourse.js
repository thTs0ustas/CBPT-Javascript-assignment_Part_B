const selectAssignmentsPerCourse = async (connection) => {
  const conn = await connection();
  const sql =
    "SELECT a.title as assignmentTitle, c.title as courseTitle FROM assignments a inner join courses c on course_id = c_id";
  const [rows] = await conn.query(sql);
  await conn.end();
  return rows;
};

module.exports = selectAssignmentsPerCourse;
