const selectTrainersPerCourse = async (connection) => {
  const conn = await connection();
  const sql = `SELECT  concat(first_name,' ', last_name) as full_name , title as participates from trainers t
                inner join trainer_course_connection tc
                on t.trainer_id = tc.trainer_id
                inner join courses c
                on c.course_id = tc.subject_id;`;
  const [rows] = await conn.query(sql);
  await conn.end();
  return rows;
};

module.exports = selectTrainersPerCourse;
