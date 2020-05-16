import React from 'react'

export default ({children, loading}) =>
    <div>
        {loading ? <div className='spinner loading'/> : children}
    </div>
