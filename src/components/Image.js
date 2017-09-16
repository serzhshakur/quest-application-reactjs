import React from 'react'

export default (props) => {
    const { image, openModal } = props;
    return (
        <div className='question-img'>
            <img src={image} onClick={openModal} />
        </div>
    )
}