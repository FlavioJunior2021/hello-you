import React, { useState } from 'react';
import { Link , useHistory} from 'react-router-dom';
import './index.scss';

import { getDatabase, ref, set, push } from 'firebase/database'

import chat_ilustracao from '../../assets/images/chat_ilustracao.svg';

import { Button } from '../../components/Button/index';
import { UseAuth } from '../../hooks/useAuth'

export function NewRoom(){

    const [newRoom, setNewRoom] = useState('');
   
    const { user } = UseAuth();
    const history = useHistory();

    async function handleCreateRoom(event) {
        event.preventDefault();
        const db = getDatabase();
        if(newRoom.trim() === '') {
            return;
        }
        const chatRef = ref(db, `chats`);
        const firebaseChat = push(chatRef);
        set(firebaseChat,{
            tittle: newRoom,
            author: user?.name,
            authorId: user?.id
        })
        history.push(`/rooms/${firebaseChat.key}`)
    }

    return(
        <div id="page-room">
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
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Room name"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit" />
                    </form>
                    <div className="separator">Create room</div>
                    <span>
                        <Link to="/">
                            Enter a room
                        </Link>
                    </span>
                </div>
            </main>
        </div>
    );
};