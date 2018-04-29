export default function formTableData(serverData, jsonData) {
  const units = jsonData.units.map((jsonUnit) => {
    const lessons = jsonUnit.lessons.map((jsonLesson) => {
      const lesson = {
        lesson_id: jsonLesson.lesson_id,
        lesson_name: jsonLesson.name,
        lesson_description: jsonLesson.description,
        pass_weight: jsonLesson.quizzes[0].pass_weight,
        lesson_points: jsonLesson.quizzes[0].total_weight,
        attempts: []
      };
      if (serverData.attempts && serverData.attempts['' + jsonUnit.unit_id] && serverData.attempts['' + jsonUnit.unit_id]['' + jsonLesson.lesson_id]) {
        lesson.attempts = serverData.attempts['' + jsonUnit.unit_id]['' + jsonLesson.lesson_id];
      }
      return lesson;
    });
    const unit = {
      unit_id: jsonUnit.unit_id,
      unit_name: jsonUnit.name,
      lessons: lessons
    };
    return unit;
  });
  console.log(units);
  return units;

}