import React, {ChangeEvent, FC} from "react"

type EditableEntityProps = {
    name: string,
    content: string | boolean,
    label: string,
    isEditMode: boolean,
    onChangeFunc: (event: ChangeEvent<HTMLInputElement>) => void,
}

const EditableCheckbox: FC<EditableEntityProps> = (props) => {
    const {isEditMode, onChangeFunc, name, label, content} = props;
    const booleanValue = content as boolean;

    return <div className='quest-prop'>
        <label className='prop-title' htmlFor={name}>{label}</label>
        <div className='prop-content'>
            {isEditMode ? <input type="checkbox"
                                 disabled={!isEditMode}
                                 checked={booleanValue}
                                 id={name}
                                 name={name}
                                 onChange={onChangeFunc}
            /> : booleanValue ? 'да' : 'нет'}
        </div>
    </div>
}

export default EditableCheckbox;
