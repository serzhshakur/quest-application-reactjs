import React from 'react'
import HintsSvg from './svg/HintsSvg.js'
import WrongAnswers from './svg/WrongAnswersSvg'


const PenaltiesContainer = (props) => (
    <div id='penalties'>
        <WrongAnswers />
        <div className="penalties-units" id="penalties-wrong-answers">{props.wrongAnswers}</div>
        <HintsSvg />
        <div className="penalties-units" id="penalties-hint-retrievals">{props.hintRetrievals}</div>
    </div>
)

export default PenaltiesContainer;