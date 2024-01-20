import React, { useEffect, useState } from 'react'

export default function Home() {

    const [question,setQuestion] = useState([]);
    const [currQuesIndex, setCurrQuesIndex] = useState(0);

    useEffect( () => {
        const fetchQuizQuestions = async () => {
            const url ="https://quizapi.io/api/v1/questions?apiKey=s2PNbRRj00CuxYwWqs9DHk8I3TublV5viEfNQnGL&limit=100";
            const response = await fetch(url);
            const result = await response.json();
            setQuestion(result);
        };
        fetchQuizQuestions();
    },[]);

    const handleNextQuestion = () => {
        setCurrQuesIndex(currQuesIndex+1);
    }

    const handlePreviousQuestion = () => {
        setCurrQuesIndex(currQuesIndex-1);
    }

  return (
    <div className="container">
        <h1>Quizz App</h1>
        { (question.length > 0 && currQuesIndex < question.length) ? (
            <div className="questions">
                <p>{question[currQuesIndex].question}</p>
                <ol>
                {Object.keys(question[currQuesIndex].answers).map((key, index) => (
                  <li key={index}>{question[currQuesIndex].answers[key]}</li>
                ))}
                </ol>
                <button onClick={handlePreviousQuestion} disabled={currQuesIndex <= 0}>Previous</button>
                <button onClick={handleNextQuestion} disabled={currQuesIndex >= question.length-1}>Next</button>
            </div>
        ):(
            <p>Loading Question</p>
        )}
    </div>
  );
}

