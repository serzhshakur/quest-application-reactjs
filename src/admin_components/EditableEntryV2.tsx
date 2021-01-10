import React, {ChangeEvent, FC, useEffect, useRef} from "react"
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

    const padding = 10;

    useEffect(() => {
            if (null !== ref.current) {
                ref.current.style.height = '1px';

                let scrollHeight = ref.current.scrollHeight;
                ref.current.style.height = `${scrollHeight - padding * 2}px`;
            }
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
                    style={{padding: padding}}
                />
                : <ReactMarkdown>{value}</ReactMarkdown>}
        </div>
    </div>
}

export default EditableEntryV2;
