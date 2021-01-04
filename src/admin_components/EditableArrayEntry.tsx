import React, {FC, useCallback, useEffect, useState} from "react"
import {generateRandomAlphanumeric} from "./EditQuest";

type EntityProps = {
    name: string,
    values: string[],
    isEditMode: boolean,
    onChangeFunc: (value: string[]) => void,
}

const EditableArrayEntry: FC<EntityProps> = (props) => {
    const {name, values, isEditMode, onChangeFunc} = props;
    const [unsavedValues, setUnsavedValues] = useState<Map<string, string>>(new Map());
    const [removedItems, setRemovedItems] = useState<string[]>([]);

    useEffect(() => {
        let map = new Map<string, string>()
        values.forEach((value) => map.set(generateRandomAlphanumeric(), value));
        setUnsavedValues(map);
    }, [values]);

    const flushValues = useCallback(() => {
        const newValues = Array.from(unsavedValues.values());
        onChangeFunc(newValues);
    }, [unsavedValues]);

    useEffect(() => {
        removedItems.forEach((key) => {
            if (!unsavedValues.has(key)) {
                flushValues();
                const arr = removedItems.filter(it => it !== key);
                setRemovedItems(arr);
            }
        })
    }, [removedItems]);

    const addValue = useCallback(() => {
        let map = new Map(unsavedValues).set(generateRandomAlphanumeric(), '');
        setUnsavedValues(map)
    }, [unsavedValues]);

    const removeValue = useCallback((key: string) => {
        const newMap = new Map(unsavedValues);
        newMap.delete(key);
        setUnsavedValues(newMap);
        setRemovedItems([...removedItems, key]);
    }, [unsavedValues]);

    const editValue = useCallback((key: string, content: string) => {
        let newMap = new Map(unsavedValues).set(key, content);
        setUnsavedValues(newMap);
    }, [unsavedValues]);


    return <div className='quest-prop'>
        <div className='prop-title'>{name}</div>
        <div className='prop-content'>
            <ul>
                {Array.from(unsavedValues.entries()).map(([key, value]) =>
                    <li key={key}>
                        {isEditMode
                            ? <div className='panel-label-container'>
                                <input
                                    type='url'
                                    value={value}
                                    onChange={event => editValue(key, event.target.value)}
                                    onBlur={flushValues}
                                />
                                <button className='panel-remove-button' onClick={() => removeValue(key)}>
                                    {isEditMode ? '⨯' : ''}
                                </button>
                            </div>
                            : <a href={value}>{value.split('/').pop()}</a>
                        }
                    </li>
                )}
            </ul>
        </div>
        {isEditMode && <button id='add-new-item' onClick={addValue}>+</button>}
    </div>
}

export default EditableArrayEntry;
