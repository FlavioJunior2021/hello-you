import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { UseAuth } from '../../hooks/useAuth'
import './index.scss';
import { Button } from '../../components/Button/index';

import { getDatabase, ref, set, push, get} from 'firebase/database'

import chat_ilustracao from '../../assets/images/chat_ilustracao.svg';
import google_icon from '../../assets/images/google.svg';
import facebook_icon from '../../assets/images/facebook.svg';

//import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


export function HomePage(){

    const history = useHistory();
    const { signInWithGoogle, signInWithFacebook, user } = UseAuth();
    const [chatCode, setChatCode] = useState('');
    const db = getDatabase();

    async function navigateToCreateRoomGoogle(){
        if(!user){
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }
    async function navigateToCreateRoomFacebook(){
        if(!user){
            await signInWithFacebook()
        }
        history.push('/rooms/new')
    }
    async function handleJoinChat(event){
        event.preventDefault();
        if(chatCode.trim() === ''){
            return;
        }
        const chatRef = await get(ref(db, `chats/${chatCode}`));
        if(!chatRef.exists()){
            alert("Chat does not exists");
            return;
        }
        history.push(`/rooms/${chatCode}`)
    }

    return(
        <div id="page-login">
            <aside>
                <img src={chat_ilustracao} alt="chat ilustration" />
                <strong>
                    Create your chat room in real time
                </strong>
                <p>
                    Talk about your favorite subjects
                </p>
            </aside>
            <main>
                <div className="main-content">
                    <div className="buttons">
                        <button className="create-chat" id="button-id" onClick={navigateToCreateRoomGoogle}>
                            <img src={google_icon} alt="google icon" />
                            Create your room with Google
                        </button>
                        <button className="create-chat" id="buttons-id" onClick={navigateToCreateRoomFacebook}>
                            <img src={facebook_icon} alt="facebook icon" />
                            Create your room with Facebook
                        </button>
                    </div>
                    <div className="separator">Or enter a room</div>
                    <form onSubmit={handleJoinChat}>
                        <input
                            type="text"
                            placeholder="Chat code"
                            onChange={event => setChatCode(event.target.value)}
                            value={chatCode}
                        />
                        <Button type="submit" />
                    </form>
                    <div className="separator">Find a room</div>
                    <span>
                        <a href="http://">
                            Rooms
                        </a>
                    </span>
                </div>
            </main>
        </div>
    );
};