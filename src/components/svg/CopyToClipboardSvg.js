import React from 'react'
import {useCopyToClipboard} from "react-use";

export default ({valueToCopy}) => {

    const [_, copyToClipboard] = useCopyToClipboard()

    return <a title="Copy to clipboard"
              className="copy-link"
              onClick={() => copyToClipboard(valueToCopy)}
    >&nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 72" className="copy-icon">
            <path fill="#c7c7cd"
                  d="M56 6v44c0 3.3-2.7 6-6 6h-6v-6h6V6H22v6h-6V6c0-3.3 2.7-6 6-6h28c3.3 0 6 2.7 6 6zM34 22H6v44h28V22m0-6c3.3 0 6 2.7 6 6v44c0 3.3-2.7 6-6 6H6c-3.3 0-6-2.7-6-6V22c0-3.3 2.7-6 6-6h28zm-6 32H12c-1.1 0-2 .9-2 2s.9 2 2 2h16c1.1 0 2-.9 2-2s-.9-2-2-2zm-4-8H12c-1.1 0-2 .9-2 2s.9 2 2 2h12c1.1 0 2-.9 2-2s-.9-2-2-2zm4-8H12c-1.1 0-2 .9-2 2s.9 2 2 2h16c1.1 0 2-.9 2-2s-.9-2-2-2z"></path>
        </svg>
    </a>
}