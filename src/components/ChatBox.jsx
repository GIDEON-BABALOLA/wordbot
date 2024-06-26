import ChatElement from "./ChatElement"
import { useContext } from "react"
import  ChatBotContext  from "../context/chatBotContext"
import { FaRobot } from "react-icons/fa";
const ChatBox = ({ apiError }) => {
  const { messages, chatBoxRef } = useContext(ChatBotContext)
  return (
    <section>
             <ul className="chatbox" ref={chatBoxRef}>
            <li className="chat incoming">
                <span  id= "robot" ><FaRobot size="1.5em"  /></span>
 
<p className="jump-text">Hi there,<br />How can I help you today?</p>
            </li>
            {messages.map((message) => (
<ChatElement  key={message.id}  id={message.id} message={message.message} audio={message.audio} type={message.type} apiError={apiError} 
time={message.time}
error={message.error}/>
            ))}
        </ul>
    </section>
  )
}

export default ChatBox