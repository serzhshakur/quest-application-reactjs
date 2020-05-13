import React, {useCallback, useEffect, useState} from 'react'
import {fetchCodes, generateNewCode} from '../api/apiAdmin'

export default ({questId}) => {

    const [questCodes, setQuestCodes] = useState([])

    useEffect(() => fetchCodesHandler(),
        [questId]
    )

    const fetchCodesHandler = useCallback(async () => {
        const codes = await fetchCodes(questId)
        setQuestCodes(codes)
    })

    const newCodeHandler = useCallback(async () => {
        const response = await generateNewCode(questId)
        setQuestCodes(response.codes)
    })

    return (
        <div>
            <h2>Коды</h2>
            <table className="codes-table">
                <thead>
                <tr>
                    <th>Код</th>
                    <th>Был выдан</th>
                </tr>
                </thead>
                <tbody>
                {questCodes.map(({code, isGiven}) => {
                        return (
                            <tr key={code}>
                                <td>{code}</td>
                                <td>{isGiven ? 'x' : '-'}</td>
                            </tr>
                        )
                    }
                )}

                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="2">
                        <button
                            className="admin-button"
                            onClick={newCodeHandler}>
                            Новый код
                        </button>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    )
}
