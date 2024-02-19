import React, { useState, useEffect } from 'react';
import QuestionItem from './QuestionItem';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;