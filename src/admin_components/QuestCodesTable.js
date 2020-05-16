import React, {useCallback, useEffect, useState} from 'react'
import {fetchCodes, generateNewCode} from '../api/apiAdmin'
import LoadableComponent from "./LoadableComponent";
import CopyToClipboardSvg from "../components/svg/CopyToClipboardSvg";

export default ({questId}) => {

    const [questCodes, setQuestCodes] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
            fetchCodesHandler()
        },
        [questId]
    )

    const fetchCodesHandler = useCallback(async () => {
        setLoading(true)
        const codes = await fetchCodes(questId)
        setQuestCodes(codes)
        setLoading(false)
    })

    const newCodeHandler = useCallback(async () => {
        const response = await generateNewCode(questId)
        setQuestCodes(response.codes)
    })

    return (
        <div>
            <h2>Коды</h2>
            <LoadableComponent loading={loading}>
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
                                    <td>{code}
                                        <CopyToClipboardSvg valueToCopy={code}/>
                                    </td>
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
            </LoadableComponent>
        </div>
    )
}
