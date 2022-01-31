const selectAssignmentsPerCoursePerStudent = async (connection) => {
  const conn = await connection();
  const sql = `select concat(first_name, " ", last_name) as full_name, 
                a.title as assignTitle, 
                c.title as courseTitle from assignments a
                inner join student_assignments sa
                on a.assignments_id = sa.assignments_id
                join students s
                on s.students_id = sa.student_id
                inner join courses c
                on c_id = c.course_id;`;
  const [rows] = await conn.query(sql);
  await conn.end();
  return rows;
};

module.exports = selectAssignmentsPerCoursePerStudent;
