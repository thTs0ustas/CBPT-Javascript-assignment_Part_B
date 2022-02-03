const schemas = {
  selectOrInsert: {
    properties: {
      selectOrInsert: {
        pattern: /[01]/,
        description:
          'If you want to get data from database press "0". If you want to add data press "1"',
        require: true,
      },
    },
  },
  insert: {
    properties: {
      insert: {
        pattern: /[0-6]/,
        description: `Insert student: "0".
                      Insert trainer: "1". 
                      Insert course: "2".
                      Insert assignment: "3".
                      Insert student per course: "4".
                      Insert trainer per course: "5".
                      Insert assignments per course per student: "6"`,
        require: true,
      },
    },
  },
  select: {
    properties: {
      select: {
        pattern: /[0-7]/,
        description: `Select students: "0".
                      Select trainers: "1". 
                      Select courses: "2".
                      Select assignments: "3"
                      Select assignmentPerCourse: "4"
                      Select studentsPerCourse: "5"
                      Select trainersPerCourse: "6"
                      Select assignmentsPerCoursePerStudent: "7"
                `,
        require: true,
      },
    },
  },
};

module.exports = schemas;
