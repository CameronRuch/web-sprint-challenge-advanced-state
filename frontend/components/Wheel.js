import React from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'

import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

const Wheel = props => {

  const spot = props.state
  const dispatch = useDispatch();

  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={spot === 0 ? "cog active" : "cog"} style={{ "--i": 0 }}>{spot === 0 ? 'B' : ''}</div>
        <div className={spot === 1 ? "cog active" : "cog"} style={{ "--i": 1 }}>{spot === 1 ? 'B' : ''}</div>
        <div className={spot === 2 ? "cog active" : "cog"} style={{ "--i": 2 }}>{spot === 2 ? 'B' : ''}</div>
        <div className={spot === 3 ? "cog active" : "cog"} style={{ "--i": 3 }}>{spot === 3 ? 'B' : ''}</div>
        <div className={spot === 4 ? "cog active" : "cog"} style={{ "--i": 4 }}>{spot === 4 ? 'B' : ''}</div>
        <div className={spot === 5 ? "cog active" : "cog"} style={{ "--i": 5 }}>{spot === 5 ? 'B' : ''}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button onClick = { () => dispatch(moveCounterClockwise())} id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick = {() => dispatch(moveClockwise())} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  state: state.wheel
})
export default connect(mapStateToProps, { moveClockwise, moveCounterClockwise })(Wheel)