const selectStudentsPerCourse = async (connection) => {
  const conn = await connection();
  const sql = `SELECT concat(first_name,' ', last_name) as full_name ,title as participates  
                FROM students s 
                inner join students_courses_connection sc 
                on s.students_id = sc.student_id 
                inner join courses c 
                on c.course_id = sc.course_id`;
  const [rows] = await conn.query(sql);
  await conn.end();
  return rows;
};

module.exports = selectStudentsPerCourse;
