import React, { useState } from 'react';

// Your existing QuestionList component
function QuestionList({ questions }) {
  return (
    <div>
      {/* Display the list of questions */}
      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question.prompt}</h3>
          <ul>
            {question.answers.map((answer, answerIndex) => (
              <li key={answerIndex}>{answer}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Your existing form component
function QuestionForm({ onSubmit }) {
  const [prompt, setPrompt] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleFormSubmit = event => {
    event.preventDefault();

    const formData = {
      prompt,
      answers: [answer1, answer2, answer3],
      correctIndex: parseInt(correctIndex)
    };

    onSubmit(formData);

    setPrompt('');
    setAnswer1('');
    setAnswer2('');
    setAnswer3('');
    setCorrectIndex(0);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Question Prompt:
        <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} />
      </label>
      <br />
      <label>
        Answer 1:
        <input type="text" value={answer1} onChange={e => setAnswer1(e.target.value)} />
      </label>
      <br />
      <label>
        Answer 2:
        <input type="text" value={answer2} onChange={e => setAnswer2(e.target.value)} />
      </label>
      <br />
      <label>
        Answer 3:
        <input type="text" value={answer3} onChange={e => setAnswer3(e.target.value)} />
      </label>
      <br />
      <label>
        Correct Answer Index:
        <input type="number" value={correctIndex} onChange={e => setCorrectIndex(e.target.value)} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

// Your main App component
function App() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = formData => {
    fetch('/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        setQuestions([...questions, data]);
      })
      .catch(error => {
        console.error('Error creating question:', error);
      });
  };

  return (
    <div>
      <h1>Question List</h1>
      <QuestionList questions={questions} />
      <h2>Add a New Question</h2>
      <QuestionForm onSubmit={addQuestion} />
    </div>
  );
}

export default App;