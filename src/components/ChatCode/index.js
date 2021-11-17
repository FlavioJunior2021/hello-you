import { useParams } from 'react-router-dom'

import copy from '../../assets/images/copy.svg';
import './index.scss';

export function ChatCode(){

    const params = useParams();
    const chatCode = params.id;

    function copyChatCodeToClipboard(){
        navigator.clipboard.writeText(chatCode);
    }

    return(
        <button className="chat-code" onclick={copyChatCodeToClipboard}>
            <div>
                <img src={copy} alt="copy" />
            </div>
            <span>
                {chatCode}
            </span>
        </button>
    );
};