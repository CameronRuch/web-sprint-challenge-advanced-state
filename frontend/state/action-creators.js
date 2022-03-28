import axios from "axios"
import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from "./action-types"

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return ({ type: MOVE_CLOCKWISE })
 }

export function moveCounterClockwise() {
  return ({ type: MOVE_COUNTERCLOCKWISE })
 }

export function selectAnswer(answer_id) {
  return function (dispatch) {
    dispatch({ type: SET_SELECTED_ANSWER, payload: answer_id})
  }
}

export function setMessage(message) {
  return ({ type: SET_INFO_MESSAGE, payload: message })
 }

export function setQuiz(data) {
  return ({ type: SET_QUIZ_INTO_STATE, payload: data})
 }

export function inputChange(text) {
  return ({ type: INPUT_CHANGE, payload: text })
 }

export function resetForm() {
  return ({ type: RESET_FORM })
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: SET_QUIZ_INTO_STATE, payload: { answers: null, quiz_id: null, question: null } })
    axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      dispatch(setQuiz(res.data))
    })
    .catch(err => {
      console.log(err)
    })

    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', {quiz_id, answer_id})
    .then(res => {
      dispatch({ type: SET_SELECTED_ANSWER, payload: null })
      dispatch({ type: SET_INFO_MESSAGE, payload: res.data.message })
      dispatch(fetchQuiz())
    })
    .catch(err => {
      console.log(err)
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(newQuestionText, newTrueAnswerText, newFalseAnswerText) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new',
    { newQuestionText, newTrueAnswerText, newFalseAnswerText })
    .then(res => {
      dispatch(setMessage(res.data.question))
      dispatch(resetForm())
    })
    .catch(err => {
      console.log(err.message)
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
