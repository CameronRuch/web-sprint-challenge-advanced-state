import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  

  const { form, fetchQuiz, inputChange, postQuiz } = props

  const onChange = evt => {
    evt.preventDefault()
    const { value, id } = evt.target
    inputChange({ [id]: value })
  }

  const { newQuestion, newTrueAnswer, newFalseAnswer } = form;

  const onSubmit = (e) => {
    e.preventDefault(); 
    const inputs = {
      question_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer,
    }
    props.postQuiz(inputs)
  }

  const toggleButton = () => {
    return (
      newQuestion.trim().length < 1 ||
      newTrueAnswer.trim().length < 1 ||
      newFalseAnswer.trim().length < 1 
    )
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input value={newQuestion} maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input value={newTrueAnswer} maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={newFalseAnswer} maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button disabled={toggleButton()} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)