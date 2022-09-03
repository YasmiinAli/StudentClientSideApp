import React, { useState, useEffect } from 'react'
import './Student.css'
import ProgressBar from '../ProgressBar/ProgressBar'
import axios from 'axios'

function Student() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [data, getData] = useState([]);
  const [rank, setRank] = useState(0);
  const first = document.querySelector('#first');
  const second = document.querySelector('#second');
  const third = document.querySelector('#third');
  const forth = document.querySelector('#forth');
// Get Words
  const getWords = () => {
    axios
      .get('http://localhost:8080/words')
      .then((response) => {
        const words = response.data
        getData(words)
      })
      .catch((error) => console.log(`Error: ${error}`))
  }
  
// Get Rank
  const getRank = () => {
    axios
      .post('http://localhost:8080/rank',{score:(score / data.length) * 100})
      .then((response) => {
        const rank = response.data;
        setRank(rank);
        console.log("success",response.data);
      })
      .catch((error) => console.log(`Error: ${error}`))
  }
  
  
  useEffect(() => {
    getWords();
    getRank();
  }, [])

  console.log(data)

  /* A possible answer was clicked */
  const checkNoun = (pos) => {
    // Increment the score
    if (pos === 'noun') {
      setScore(score + 1)
      first.classList.add('correctAnswer')
    } else {
      first.classList.add('wrongAnswer')
    }
  }

  /* A possible answer was clicked */
  const checkVerb = (pos) => {
    // Increment the score
    if (pos === 'verb') {
      setScore(score + 1)
      second.classList.add('correctAnswer')
    } else {
      second.classList.add('wrongAnswer')
    }
  }

  /* A possible answer was clicked */
  const checkAdverb = (pos) => {
    // Increment the score
    if (pos === 'adverb') {
      setScore(score + 1)
      third.classList.add('correctAnswer')
    } else {
      third.classList.add('wrongAnswer')
    }
  }

  /* A possible answer was clicked */
  const checkAdjective = (pos) => {
    // Increment the score
    if (pos === 'adjective') {
      setScore(score + 1)
      forth.classList.add('correctAnswer')
    } else {
      forth.classList.add('wrongAnswer')
    }
  }
  /*   Next Question        */

  const nextQuestion = () => {
    if (currentQuestion + 1 < data.length) {
      setCurrentQuestion(currentQuestion + 1)
      first.classList.remove('correctAnswer')
      first.classList.remove('wrongAnswer')
      second.classList.remove('correctAnswer')
      second.classList.remove('wrongAnswer')
      third.classList.remove('correctAnswer')
      third.classList.remove('wrongAnswer')
      forth.classList.remove('correctAnswer')
      forth.classList.remove('wrongAnswer')
    } else {
      setShowResults(true)
    }
  }

  /* Resets the exam */
  const restartExam = () => {
    setScore(0)
    setCurrentQuestion(0)
    setShowResults(false)
  }

  if (data.length > 0) {
    return (
      <div className="Student">
        {/*  Show results or show the question game  */}
        {showResults ? (
          /*  Final Results */
          <div className="final-results">
            <h1>Final Results</h1>
            <h2>
              {score} out of {data.length} correct - (
              {(score / data.length) * 100}%)
            </h2>
            {/* <h3> Your Rank between Your beers<span className='text-primary text-bold'> {rank}</span> %</h3> */}
            <ProgressBar width={(score / data.length) * 100} />
            <button
              onClick={() => restartExam()}
              className="btn btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        ) : (
          /*  Question Card  */
          <div className="question-card">
            {/*  Current Score  */}
            <h2>Your Score: {score}</h2>
            {/*  Header  */}
            <h1 className="text-warning">Choose the correct answer</h1>
            {/*  Questions  */}
            <h2>
              Question: {currentQuestion + 1} out of {data.length}
            </h2>
            <h3 className="question-text">
              {data[currentQuestion].word} ...............
            </h3>

            {/* List of possible answers  */}
            <ul>
              <li
                onClick={() => checkNoun(data[currentQuestion].pos)}
                id="first"
              >
                noun
              </li>
              <li
                onClick={() => checkVerb(data[currentQuestion].pos)}
                id="second"
              >
                verb
              </li>
              <li
                onClick={() => checkAdverb(data[currentQuestion].pos)}
                id="third"
              >
                adverb
              </li>
              <li
                onClick={() => checkAdjective(data[currentQuestion].pos)}
                id="forth"
              >
                adjective
              </li>
            </ul>
            <button
              className="btn btn-success btn-lg"
              onClick={() => nextQuestion()}
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div className="d-flex justify-content-center ">
        <div className="spinner-border text-primary " role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
}

export default Student
