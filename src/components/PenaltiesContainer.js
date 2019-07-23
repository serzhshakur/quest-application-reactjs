import React from 'react'
import TooltipContainer from './TooltipContainer'
import HintsSvg from './svg/HintsSvg.js'
import WrongAnswers from './svg/WrongAnswersSvg'


const PenaltiesContainer = (props) => (
    <div id='penalties'>
        <TooltipContainer component={WrongAnswers} tooltipText='неверные ответы'/>
        <div className="penalties-units" id="penalties-wrong-answers">{props.wrongAnswers}</div>
        <TooltipContainer component={HintsSvg} tooltipText='взятые подсказки'/>
        <div className="penalties-units" id="penalties-hint-retrievals">{props.hintRetrievals}</div>
    </div>
)

export default PenaltiesContainer;