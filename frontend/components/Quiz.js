import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { fetchQuiz } from '../state/action-creators'
import { useEffect, useState } from 'react'
import { selectAnswer, postAnswer } from '../state/action-creators'

const Quiz = props => {

const dispatch = useDispatch();

useEffect(() => {
  props.fetchQuiz()
}, [])

const submitAnswer = e => {
  console.log(props)
  e.preventDefault()
  dispatch(postAnswer(props.quiz.quiz_id, props.selectedAnswer))
}

  

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz?.question ? (
          <>
            <h2>{props.quiz.question}</h2>
            <div id="quizAnswers">
              {props.quiz.answers?.map((answer) => {
                return (
                <div key={answer.answer_id} className={` answer ${props.selectedAnswer === answer.answer_id ? "selected" : ""} `}>
                {answer.text}
                <button onClick={ () => dispatch(selectAnswer(answer.answer_id))}>
                  {props.selectedAnswer === answer.answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
                )
              })}

            </div>

            <button disabled={ !props.selectedAnswer } onClick={(e) => submitAnswer(e)} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, { fetchQuiz, postAnswer })(Quiz)