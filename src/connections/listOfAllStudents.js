const listOfAllStudents = async (connection) => {
  const conn = await connection();
  const sql = "SELECT * FROM students";
  const [rows] = await conn.query(sql);
  console.log(rows);
  await conn.end();
};

const listOfAllCourses = async (connection) => {
  const conn = await connection();
  const sql = "SELECT * FROM courses";
  const [rows] = await conn.query(sql);
  console.log(rows);
  await conn.end();
};

const listOfAllTrainers = async (connection) => {
  const conn = await connection();
  const sql = "SELECT * FROM trainers";
  const [rows] = await conn.query(sql);
  console.log(rows);
  await conn.end();
};

const listOfAllAssignments = async (connection) => {
  const conn = await connection();
  const sql = "SELECT * FROM assignments";
  const [rows] = await conn.query(sql);
  console.log(rows);
  await conn.end();
};

const listOfAllStudentsPerCourse = async (connection) => {
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

const listOfAssignmentsPerCourse = async (connection) => {
  const conn = await connection();
  const sql =
    "SELECT a.title as assignmentTitle, c.title as courseTitle FROM assignments a inner join courses c on course_id = c_id";
  const [rows] = await conn.query(sql);
  await conn.end();
  return rows;
};

const listOfAllTrainersPerCourse = async (connection) => {
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

const listOfAssignmentsPerCoursePerStudent = async (connection) => {
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

module.exports = {
  listOfAllStudents,
  listOfAllCourses,
  listOfAllTrainers,
  listOfAllAssignments,
  listOfAllStudentsPerCourse,
  listOfAllTrainersPerCourse,
  listOfAssignmentsPerCourse,
  listOfAssignmentsPerCoursePerStudent,
};
