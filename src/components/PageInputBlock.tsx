import React, {ChangeEvent, FC} from 'react'

type EntityProps = {
    onInput: (e: ChangeEvent<HTMLInputElement>) => any,
    label?: string,
    error?: string,
    placeholder?: string,
    pattern?: string,
    minlength?: number
}

const PageInputBlock: FC<EntityProps> = (props) => {
    const {onInput, label, error, placeholder = '', pattern, minlength = 2} = props

    return (
        <div className="input-block">
            {label && <label>{label}</label>}
            <input type='text'
                   placeholder={placeholder}
                   minLength={minlength}
                   maxLength={40}
                   onInput={onInput}
                   pattern={pattern}
                   className={error ? 'incorrect' : ''}
            />
            {error && <div className='error'>{error}</div>}
        </div>
    )
}

export default PageInputBlock
