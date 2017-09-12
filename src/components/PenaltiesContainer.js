import React from 'react'
import BottleSvg from './BottleSvg.js'


const PenaltiesContainer = (props) => (
    <div id='penalties'>
        <div id="penalties-wrong-answers-label" className="tooltip-container">&#8364;</div>
        <div className="penalties-units" id="penalties-wrong-answers">{props.wrongAnswers}</div>
        <BottleSvg />
        <div className="penalties-units" id="penalties-hint-retrievals">{props.hintRetrievals}</div>
    </div>
)

export default PenaltiesContainer;