const { groupBy } = require("lodash/fp");
const {
  listOfAllStudents,
  listOfAllCourses,
  listOfAllTrainers,
  listOfAllAssignments,
  listOfAllStudentsPerCourse,
  listOfAllTrainersPerCourse,
  listOfAssignmentsPerCourse,
  listOfAssignmentsPerCoursePerStudent,
} = require("./connections/listOfAllStudents");
const connection = require("./config");
const { keys, values, map, omit, flatMap } = require("lodash");

listOfAllStudents(connection).catch(console.log);
listOfAllCourses(connection).catch(console.log);
listOfAllTrainers(connection).catch(console.log);
listOfAllAssignments(connection).catch(console.log);
listOfAllStudentsPerCourse(connection)
  .then((data) => {
    const result = groupBy("participates")(data);

    console.log(result);
  })
  .catch(console.log);

listOfAllTrainersPerCourse(connection)
  .then((data) => {
    const result = groupBy("participates")(data);
    console.log(result);
  })
  .catch(console.log);

listOfAssignmentsPerCourse(connection)
  .then((data) => {
    const result = groupBy("courseTitle")(data);
    console.log(result);
  })
  .catch(console.log);

listOfAssignmentsPerCoursePerStudent(connection)
  .then((data) => {
    const firstLevel = groupBy("full_name")(data);

    return keys(firstLevel).reduce((fArr, key) => {
      let secondLevel = groupBy("assignTitle")(firstLevel[key]);

      let thirdLevel = map(values(secondLevel), (path) =>
        map(path, (item) => omit(item, ["full_name", "assignTitle"]))
      );
      return [...fArr, { [key]: flatMap(thirdLevel) }];
    }, []);
  })
  .then(console.log);
