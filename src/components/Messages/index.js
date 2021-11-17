import './index.scss';

export function ChatMessage({
    author,
    content,
}){
    return(
        <div className="message">
            <p>
                {content}
            </p>
            <footer>
                <div  className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span> 
                </div>
            </footer>
            <div></div>
        </div>
    );
};