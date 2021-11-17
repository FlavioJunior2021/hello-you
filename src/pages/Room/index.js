import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import bird_chat from '../../assets/images/bird_chat.svg';
import { SubmitButton } from '../../components/SubmitButton/index';
import { ChatCode } from '../../components/ChatCode/index';
import { UseAuth } from '../../hooks/useAuth';

import { ref, push,  set , getDatabase, remove, onValue} from "firebase/database";

import './index.scss';

import acount_info from '../../assets/images/account-info.svg';

import { ChatMessage } from '../../components/Messages/index';


export function ChatRoom(){

    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [tittle, setTittle] = useState('');
    const {user,  signInWithGoogle} = UseAuth();
    const db = getDatabase();
    const params = useParams();
    const chatId = params.id;
   
    useEffect(() => {
        const chatRef = ref(db,`/chats/${chatId}`);
        onValue(chatRef, chat => {
            const databaseChat = chat.val();
            const firebaseMessages = databaseChat.messages ?? {};
            const parserdMessages = Object.entries(firebaseMessages).map(([key, value]) => {
                return {
                    id: key,
                    author: value.author,
                    content: value.content,
                    isHiglighted: value.isHiglighted,
                    isAnswered: value.isAnswered
                }
            })
            setMessages(parserdMessages.reverse());
            setTittle(databaseChat.tittle);
        })
      
    },[chatId]);

    async function handleSendMessage(event){

        event.preventDefault();

        if(newMessage.trim() === ''){
            return;
        };
        if(!user){
            toast.error("Login to send a message.");
            setNewMessage('');
            return;
        }
        const messageRef = ref(db, `chats/${params.id}/messages`);
        const firebaseMessage = push(messageRef);
        set(firebaseMessage,{
            content: newMessage,
            author:{
                name: user.name,
                avatar: user.avatar,
            },
            isHiglighted: false,
            isAnswered: false,
        })
        setNewMessage('');

    }
    return(
       <div id="chat-Room">
           <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    duration: 5000,
                    style: {
                        backgroundColor: '#FB8B47',
                        color: '#ffff'
                    }
                }}
            />
           <header>
               <div className="content">
                    <img src={bird_chat} alt="chat ilustration" />
                    <div>
                        <ChatCode />
                    </div>
               </div>
           </header>
           <main className="content">
               <div className="chat-tittle">
                   <h1>
                       {tittle}
                   </h1>
                   { messages.length > 0 && <span>{messages.length} messages</span> }
               </div>
               <form onSubmit={handleSendMessage}>
                   <textarea 
                    placeholder="send a message"
                    onChange={event => setNewMessage(event.target.value)}
                    value={newMessage}
                   />
                   <SubmitButton type="submit"
                        disabled={!user}
                   />
               </form>
               <div className="form-footer">
                    { user ? (
                        <div className="user-information">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} />
                            ) : (
                                <img src={acount_info} alt="account" />
                            )}
                            <span>
                                {user.name}
                            </span>
                        </div>
                    ) : (
                        <span>
                            To send a message please <button onClick={signInWithGoogle}>login</button>
                        </span>
                    )}
                </div>
               <div className="messages-list">
                { messages.map(message => {
                        return(
                            <ChatMessage
                                key={message.id}
                                content={message.content}
                                author={message.author}
                            />
                        )
                    }).reverse()}
               </div>
           </main>
       </div>
    );
};