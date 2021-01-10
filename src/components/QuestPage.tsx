import React, {FC, useCallback, useEffect, useState} from 'react'
import Question from './Question.js'
import AnswerForm from './AnswerForm'
import HintContainer from './HintContainer.js'
import PenaltiesContainer from './PenaltiesContainer.js'
import {fetchQuestion, postAnswer} from '../api/api.js'
import {Redirect} from 'react-router-dom'
import '../styles/styles.css'
import '../styles/input.css'
import StickyHeader from "./StickyHeader";

type SessionQuestionResponse = {
    isEnd: boolean,
    questionNumber: number,
    text: string,
    images: string[],
    wrongAnswers: number,
    hintRetrievals: number
}

type AnswerResponse = {
    wrongAnswers: number,
    questionNumber: number
}

const QuestV2Page: FC = () => {

    const [question, setQuestion] = useState<SessionQuestionResponse>()
    const [questionNumber, setQuestionNumber] = useState(0)
    const [wrongAnswers, setWrongAnswers] = useState(0)
    const [hintRetrievals, setHintRetrievals] = useState(0)
    const [answer, setAnswer] = useState<string>("")
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(true)

    const questionFetcher = useCallback(() => {
        fetchQuestion()
            .then((questionResponse: SessionQuestionResponse) => {
                setQuestion(questionResponse)
                setWrongAnswers(questionResponse.wrongAnswers)
                setQuestionNumber(questionResponse.questionNumber)
            })
            .catch(e => console.log(e))
    }, [question])

    useEffect(() => {
        questionFetcher()
    }, [questionNumber])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [questionNumber])

    const submitAnswer = useCallback(async () => {
        const response: AnswerResponse = await postAnswer(answer)

        if (question) {
            setIsAnswerCorrect(response.questionNumber > question.questionNumber)
            setWrongAnswers(response.wrongAnswers)
            setQuestionNumber(response.questionNumber)
        }
    }, [answer])

    return question?.isEnd ? (<Redirect to='/finish'/>) : (
        <div>
            <StickyHeader hasPendingSession={true}/>
            <div className='light-page'>
                <Question text={question?.text} images={question?.images}/>
                <AnswerForm
                    questionNumber={questionNumber}
                    isAnswerCorrect={isAnswerCorrect}
                    onInput={setAnswer}
                    onSubmit={submitAnswer}
                />
                <HintContainer questionNumber={questionNumber}
                               updateHintRetrievals={setHintRetrievals}/>
                <PenaltiesContainer wrongAnswers={wrongAnswers} hintRetrievals={hintRetrievals}/>
            </div>
        </div>
    )
}

export default QuestV2Page
