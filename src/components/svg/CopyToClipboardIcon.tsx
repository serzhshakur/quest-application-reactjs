import React, {FC} from 'react'
import {useCopyToClipboard} from "react-use";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CopyToClipboardIcon: FC<{ valueToCopy: string }> = ({valueToCopy}) => {

    const [, copyToClipboard] = useCopyToClipboard()

    return <a title="Copy to clipboard"
              className='copy-to-clipboard'
              onClick={() => copyToClipboard(valueToCopy)}>
        <FontAwesomeIcon icon={faCopy}/>
    </a>
}

export default CopyToClipboardIcon;
