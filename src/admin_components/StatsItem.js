import React from 'react'

export default ({name, value}) => {

    return (<div className="stat">
            <span className="stat-name">{name}</span>
            <span className="stat-value">
                {value === undefined
                    ? <i>не указано</i>
                    : <b>{value}</b>
                }
            </span>
        </div>
    )
}
