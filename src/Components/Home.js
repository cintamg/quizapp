import React, { useEffect, useState } from 'react'

export default function Home() {

    const [question,setQuestion] = useState([]);
    const [currQuesIndex, setCurrQuesIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

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
        setSelectedAnswer(null);
    }

    const handlePreviousQuestion = () => {
        setCurrQuesIndex(currQuesIndex-1);
        setSelectedAnswer(null);
    }

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    }

  return (
    <>
    <h1 className='text text-center'>Quizz App</h1>
    <div className="container">
        { (question.length > 0 && currQuesIndex < question.length) ? (
            <div className="questions">
                <p className='question'><b>{currQuesIndex+1}.  {question[currQuesIndex].question}</b></p>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                {Object.entries(question[currQuesIndex].answers).filter(([key, value]) => value !== null).map(([key, value], index) => (
                <li className='answer' key={index}>
                  <label>
                    <input className='mx-3'
                      type="radio"
                      name="answerOptions"
                      value={key}
                      checked={selectedAnswer === key}
                      onChange={handleAnswerChange}
                    />
                    {value}
                  </label>
                </li>
                ))}
                </ul>
            </div>
        ):(
            <p>Loading Question</p>
        )}
    </div>
    <div class="button d-flex justify-content-between my-3">
        <button className="btn btn-primary" onClick={handlePreviousQuestion} disabled={currQuesIndex <= 0}>Previous</button>
        <button className="btn btn-primary" onClick={handleNextQuestion} disabled={currQuesIndex >= question.length-1}>Next</button>
    </div>
    </>
  );
}

