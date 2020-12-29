import React, {ChangeEvent, FC} from "react"

 type EntityProps = {
    name: string,
    value: boolean,
    label: string,
    isEditMode: boolean,
    onChangeFunc: (event: ChangeEvent<HTMLInputElement>) => void,
}

const EditableCheckbox: FC<EntityProps> = (props) => {
    const {isEditMode, onChangeFunc, name, label, value} = props;

    return <div className='quest-prop'>
        <label className='prop-title' htmlFor={name}>{label}</label>
        <div className='prop-content'>
            {isEditMode ? <input type="checkbox"
                                 disabled={!isEditMode}
                                 checked={value}
                                 id={name}
                                 name={name}
                                 onChange={onChangeFunc}
            /> : value ? 'да' : 'нет'}
        </div>
    </div>
}

export default EditableCheckbox;
