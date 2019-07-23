import React from 'react'
import styles from '../styles/tooltip.css';


export default ({component: Component, tooltipText}) => (
    <div className='tooltip-target'>
        <Component/>
        <div className='tooltip'>{tooltipText}</div>
    </div>
)
