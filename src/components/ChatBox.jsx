import ChatElement from "./ChatElement"
const chatBox = ({ messages, chatBoxRef, apiError }) => {
  return (
    <section>
             <ul className="chatbox" ref={chatBoxRef}>
            <li className="chat incoming">
                <span  id= "robot" className="material-symbols-outlined">smart_toy</span>
 
<p className="jump-text">Hi there,<br />How can I help you today?</p>
            </li>
            {messages.map((message) => (
<ChatElement  key={message.id} message={message.message} audio={message.audio} type={message.type} apiError={apiError} error={message.error}/>
            ))}
        </ul>
    </section>
  )
}

export default chatBox