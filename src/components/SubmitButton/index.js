import React from 'react';
import './index.scss';
import send from '../../assets/images/send.svg';

export function SubmitButton(){
    return(
        <button className="button-Submit" type="submit">
            <img src={send} alt="send button" /> 
        </button>
    );
};