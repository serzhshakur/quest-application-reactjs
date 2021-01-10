import React, {ChangeEventHandler, FC, useCallback, useEffect, useRef, useState} from 'react'

type EntityProps = {
    questionNumber: number,
    isAnswerCorrect: boolean,
    onInput: (value: string) => any,
    onSubmit: () => Promise<any>,
}

const AnswerForm: FC<EntityProps> = (props) => {

    const {questionNumber, onInput, onSubmit, isAnswerCorrect} = props

    const [shouldUpdateIncorrectState, setShouldUpdateIncorrectState] = useState(true)
    const [isIncorrect, setIsIncorrect] = useState(false)
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (null !== ref.current) {
            ref.current.value = ''
        }
    }, [questionNumber])

    useEffect(() => {
        setIsIncorrect(!isAnswerCorrect && shouldUpdateIncorrectState);
    }, [isAnswerCorrect, shouldUpdateIncorrectState])

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            setShouldUpdateIncorrectState(false)
            onInput(e.target.value)
        },
        [onInput]
    );
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault()
            if (null !== ref.current && ref.current.value === '') {
                setIsIncorrect(true)
            } else {
                await onSubmit()
                setShouldUpdateIncorrectState(true)
            }
        },
        [onSubmit]
    );

    return (
        <form>
            <input
                ref={ref}
                type='text'
                onInput={handleChange}
                id='answer-input'
                className={isIncorrect ? 'incorrect' : ''}
            />
            <p className='input-error-message'>{isIncorrect ? 'Ответ невереный' : ''}</p>
            <button onClick={handleSubmit} className='submit'>Проверить</button>
        </form>
    )
}

export default AnswerForm
