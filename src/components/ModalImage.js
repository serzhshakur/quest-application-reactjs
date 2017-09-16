import React from 'react'

export default (props) => {
    const { show, src, onClose } = props;
    const style = { display: show ? 'block' : 'none' };
    return (
        <div style={style} onClick={onClose} className="modal">
            <span className="close">&times;</span>
            <img src={src} className="modal-content" id="modal_image" />
        </div>
    )
}