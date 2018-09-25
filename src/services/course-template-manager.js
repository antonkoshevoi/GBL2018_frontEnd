export default function formTableData(serverData, jsonTemplateData) {
  const units = jsonTemplateData.units.map((jsonUnit) => {
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
        lesson.attempts.forEach((attempt) => {
          attempt.comment = createComment(attempt, jsonLesson.quizzes);
          delete attempt.metadata;
        })
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

  function createComment(attempt, jsonQuizzes) {
    let finalComment = '';
    if (!attempt || !attempt.metadata) {
      return '';
    }
    attempt.metadata.forEach((metadataAttempt, attemptIndex) => {
      if (!metadataAttempt) {
        return;
      }
      const questionId = Object.keys(metadataAttempt)[0];
      const mistakeDetails = metadataAttempt['' + questionId].split(',');
      const questionTemplate = findQuestionTemplate(jsonQuizzes, questionId);
      if (!questionTemplate) {
        return;
      }
      const questionType = questionTemplate.question_type_id;
      finalComment += switchQuestionType(questionTemplate, questionType, mistakeDetails);
    });
    return finalComment;
  }

  function findQuestionTemplate(jsonQuizzes, questionId) {
    let questionTemplate = '';
    for (const quizz of jsonQuizzes) {
      if (!quizz.sections) {
        continue;
      }
      for (const section of quizz.sections) {
        if (!section.questions) {
          continue;
        }
        for (const question of section.questions) {
          if (question.question_id === questionId) {
            questionTemplate = question;
            break;
          }
        }
        if (questionTemplate) {
          break;
        }
      }
      if (questionTemplate) {
        break;
      }
    }
    return questionTemplate;
  }

  function switchQuestionType(questionTemplate, questionType, mistakeDetails) {
    // This code is adaptation of BE php code located in /API/Users/Transformers/StudentReportTransformer.php,
    // function transformMetadata
    switch (questionType) {
      case '10': {
        const description = questionTemplate.description || '';
        const correctIndex = mistakeDetails[0];
        const correctAnswer = (questionTemplate && questionTemplate.question_meta &&
          questionTemplate.question_meta[correctIndex] && questionTemplate.question_meta[correctIndex][0]
          && questionTemplate.question_meta[correctIndex][0].label) || '';
        const chosenIndex = +mistakeDetails[1];
        const chosenAnswer = (questionTemplate && questionTemplate.question_meta &&
          questionTemplate.question_meta[chosenIndex] && questionTemplate.question_meta[chosenIndex][0]
          && questionTemplate.question_meta[chosenIndex][0].label) || '';
        return formAnswer(description, correctAnswer, chosenAnswer);
      }
      case '11': {
        const description = questionTemplate.description || '';
        const correctAnswer = (questionTemplate && questionTemplate.question_meta &&
          questionTemplate.question_meta.correctAnswer && questionTemplate.question_meta.correctAnswer.label) || '';
        const chosenIndex = +mistakeDetails[0];
        const chosenAnswer = (questionTemplate && questionTemplate.question_meta &&
          questionTemplate.question_meta.incorrectAnswers && questionTemplate.question_meta.incorrectAnswers[chosenIndex]) || '';
        return formAnswer(description, correctAnswer, chosenAnswer);
      }
      case '12': {
        const description = questionTemplate.description || '';
        const correctAnswer = (questionTemplate && questionTemplate.question_meta &&
          questionTemplate.question_meta.correctAnswer) || '';
        const chosenIndex = +mistakeDetails[0];
        const chosenAnswer = (questionTemplate && questionTemplate.question_meta &&
          questionTemplate.question_meta.incorrectAnswers && questionTemplate.question_meta.incorrectAnswers[chosenIndex]) || '';
        return formAnswer(description, correctAnswer, chosenAnswer);
      }
      case '13': {
        const description = questionTemplate.description || '';
        const correctAnswer = (questionTemplate && questionTemplate.question_meta &&
          questionTemplate.question_meta.correctAnswer && questionTemplate.question_meta.correctAnswer.label) || '';
        const chosenIndex = +mistakeDetails[0];
        const chosenAnswer = (questionTemplate && questionTemplate.question_meta &&
          questionTemplate.question_meta.incorrectAnswers && questionTemplate.question_meta.incorrectAnswers[chosenIndex]).label || '';
        return formAnswer(description, correctAnswer, chosenAnswer);
      }
      case '20': {
        const description = questionTemplate.description || '';
        const correctAnswer = (questionTemplate && questionTemplate.question_meta &&
          questionTemplate.question_meta.text_answer) || '';
        let chosenAnswer = '';
        if (typeof mistakeDetails === 'string') {
          chosenAnswer = mistakeDetails;
        } else {
          mistakeDetails.forEach((mistake) => {
            chosenAnswer += correctAnswer.substr(+mistake, 1);
          });
        }
        return formAnswer(description, correctAnswer, chosenAnswer);
      }
      case '21': {
        const description = questionTemplate.description || '';
        const correctAnswer = (questionTemplate && questionTemplate.question_meta &&
          questionTemplate.question_meta.text_answer) || '';
        let chosenAnswer = '';
        if (typeof mistakeDetails === 'string') {
          chosenAnswer = mistakeDetails;
        } else {
          const choices = correctAnswer.split(' ');
          mistakeDetails.forEach((mistake) => {
            chosenAnswer += choices[+mistake] + ' ';
          });
        }
        return formAnswer(description, correctAnswer, chosenAnswer);
      }
      case '30': {
        const description = questionTemplate.description || '';
        const correctAnswer = (questionTemplate && questionTemplate.question_meta &&
          questionTemplate.question_meta.text_answer) || '';
        const chosenAnswer = mistakeDetails[0];
        return formAnswer(description, correctAnswer, chosenAnswer);
      }
      case '40': {
        const description = questionTemplate.description || '';
        const dragWord = (questionTemplate && questionTemplate.question_meta && questionTemplate.question_meta.dragWord) || '';
        const correctAnswer = (questionTemplate && questionTemplate.question_meta && questionTemplate.question_meta.correctAnswer && questionTemplate.question_meta.correctAnswer.replace('___', dragWord) ) || '';
        const chosenAnswer = (questionTemplate && questionTemplate.question_meta && questionTemplate.question_meta.incorrectAnswer && questionTemplate.question_meta.incorrectAnswer.replace('___', dragWord) ) || '';
        return formAnswer(description, correctAnswer, chosenAnswer);
      }
      case '50': {
        const description = questionTemplate.description || '';
        let sentence = description;
        mistakeDetails.forEach((chosenIndex, index) => {
          const correctAnswer = (questionTemplate && questionTemplate.question_meta && questionTemplate.question_meta[chosenIndex] && questionTemplate.question_meta[chosenIndex][0] && questionTemplate.question_meta[chosenIndex][0].label) || '';
          const chosenAnswer = (questionTemplate && questionTemplate.question_meta && questionTemplate.question_meta[chosenIndex[index + 1]] && questionTemplate.question_meta[chosenIndex[index + 1]][0] && questionTemplate.question_meta[chosenIndex[index + 1]][0].label) || '';
          sentence += ' A: <font color="Green">' + correctAnswer + '</font> SA: <font color="red"> ' + chosenAnswer + '</font> <br/>';
        });
        return sentence;
      }
      case '60': {
        const description = questionTemplate.description || '';
        let chosenAnswer = '';
        if (!mistakeDetails) {
          break;
        }
        mistakeDetails.forEach((mistakeDetail, index) => {
          chosenAnswer += 'Stroke ' + (index + 1) + '; '
        });

        return formMistakes(description, chosenAnswer);
      }
      case '61': {
        const description = questionTemplate.description || '';
        let chosenAnswer = '';
        if (!mistakeDetails) {
          break;
        }
        mistakeDetails.forEach((mistakeDetail) => {
          const mistakeIndex = +mistakeDetail;
          chosenAnswer += 'Letter ' + (mistakeIndex + 1) + '; '
        });

        return formMistakes(description, chosenAnswer);
      }
      case '70': {
        const description = questionTemplate.description || '';
        let chosenAnswer = '';
        if (!mistakeDetails) {
          break;
        }
        mistakeDetails.forEach((mistakeDetail) => {
          const mistakeIndex = +mistakeDetail;
          chosenAnswer += 'Stroke ' + (mistakeIndex + 1) + '; '
        });

        return formMistakes(description, chosenAnswer);
      }
      case '71': {
        const description = questionTemplate.description || '';
        let chosenAnswer = '';
        if (!mistakeDetails) {
          break;
        }
        mistakeDetails.forEach((mistakeDetail) => {
          const mistakeIndex = +mistakeDetail;
          chosenAnswer += 'Stroke ' + (mistakeIndex + 1) + '; '
        });

        return formMistakes(description, chosenAnswer);
      }
    }
  }

  function formAnswer(description, correctAnswer, chosenAnswer) {
    // TODO maybe resolve 'attempt num'    
    if (!chosenAnswer || (typeof chosenAnswer === "undefined")) {
        chosenAnswer = 'no answer';
    }
    return '<span>Q: ' + description + ' A: <font color="Green">' + correctAnswer + '</font> SA: <font color="red"> ' + chosenAnswer + '</font></span> <br/>';
  }

  function formMistakes(description, chosenAnswer) {
    // TODO maybe resolve 'attempt num'    
    return 'Q: ' + description + ' Mistakes: <font color="red"> ' + chosenAnswer + '</font> <br/>';
  }

}