const prompt = require("prompt");
const schemas = require("./schemas");
const { groupBy } = require("lodash/fp");
const { keys, values, map, omit, flatMap } = require("lodash");

const connection = require("./config");

const selectStudents = require("./connections/selectStudents");
const selectTrainers = require("./connections/selectTrainers");
const selectCourses = require("./connections/selectCourses");
const selectAssignments = require("./connections/selectAssignments");
const selectStudentsPerCourse = require("./connections/selectStudentsPerCourse");
const selectTrainersPerCourse = require("./connections/selectTrainersPerCourse");
const selectAssignmentsPerCourse = require("./connections/selectAssignmentsPerCourse");
const selectAssignmentsPerCoursePerStudent = require("./connections/selectAssignmentsPerCoursePerStudent");

const insertStudents = require("./inserts/insertStudents");
const insertTrainers = require("./inserts/insertTrainers");
const insertCourses = require("./inserts/insertCourses");
const insertAssignments = require("./inserts/insertAssignments");

const promptMessages = async () => {
  prompt.start();
  const { selectOrInsert } = await prompt.get(schemas.selectOrInsert);

  if (Number(selectOrInsert) === 0) {
    const { select } = await prompt.get(schemas.select);
    switch (Number(select)) {
      case 0:
        selectStudents(connection).then(console.log).catch(console.log);
        break;
      case 1:
        selectTrainers(connection).then(console.log).catch(console.log);
        break;
      case 2:
        selectCourses(connection).then(console.log).catch(console.log);
        break;
      case 3:
        selectAssignments(connection).then(console.log).catch(console.log);
        break;
      case 4:
        selectAssignmentsPerCourse(connection)
          .then((data) => {
            const result = groupBy("courseTitle")(data);
            console.log(result);
          })
          .catch(console.log);
        break;

      case 5:
        selectStudentsPerCourse(connection)
          .then((data) => {
            const result = groupBy("participates")(data);
            console.log(result);
          })
          .catch(console.log);
        break;
      case 6:
        selectTrainersPerCourse(connection)
          .then((data) => {
            const result = groupBy("participates")(data);
            console.log(result);
          })
          .catch(console.log);
        break;

      case 7:
        selectAssignmentsPerCoursePerStudent(connection)
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
          .then(console.log)
          .catch(console.log);
        break;
    }
  } else {
    const { insert } = await prompt.get(schemas.insert);
    switch (Number(insert)) {
      case 0:
        insertStudents(connection).catch(console.log);
        break;
      case 1:
        insertTrainers(connection).catch(console.log);
        break;
      case 2:
        insertCourses(connection).catch(console.log);
        break;
      case 3:
        insertAssignments(connection).catch(console.log);
        break;
    }
  }
};

promptMessages().catch(console.log);
