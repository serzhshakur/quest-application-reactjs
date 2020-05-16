import React from 'react'

export default ({
                    onInput,
                    label,
                    error,
                    placeholder = '',
                    pattern,
                    minlength = 2
                }) => {
    return (
        <div className="input-block">
            {label && <label>{label}</label>}
            <input type='text'
                   placeholder={placeholder}
                   minLength={minlength}
                   maxLength='40'
                   onInput={onInput}
                   pattern={pattern}
                   className={error ? 'incorrect' : ''}
            />
            {error ? <div className='error'>{error}</div> : null}
        </div>
    )
}
