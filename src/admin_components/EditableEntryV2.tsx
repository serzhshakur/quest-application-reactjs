import React, {ChangeEvent, FC, useEffect, useRef, useState} from "react"
import ReactMarkdown from 'react-markdown'

type EntityProps = {
    name: string,
    value: string,
    label: string,
    isEditMode: boolean,
    onChangeFunc: (event: ChangeEvent<HTMLTextAreaElement>) => void,
}

const EditableEntryV2: FC<EntityProps> = (props) => {
    const {isEditMode, onChangeFunc, name, label, value} = props;
    const ref = useRef<HTMLTextAreaElement>(null);
    const [height, setHeight] = useState<string>('auto');

    const padding = 13;

    useEffect(() => {
            let scrollHeight = ref.current?.scrollHeight;
            let cssHeight = scrollHeight ? `${scrollHeight - padding * 2}px` : 'auto';
            setHeight(cssHeight);
        }, [value, isEditMode]
    )

    return <div className='quest-prop'>
        <label className='prop-title' htmlFor={name}>{label}</label>
        <div className='prop-content'>
            {isEditMode
                ? <textarea
                    disabled={!isEditMode}
                    ref={ref}
                    id={name}
                    name={name}
                    onChange={onChangeFunc}
                    value={value}
                    style={{height: height, padding: padding}}
                />
                : <ReactMarkdown>{value}</ReactMarkdown>}
        </div>
    </div>
}

export default EditableEntryV2;
