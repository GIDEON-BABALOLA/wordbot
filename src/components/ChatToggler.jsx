import { BiConversation } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
const ChatToggler = ({toggleChatBot, setToggleChatBot}) => {
    const openChatBot = () => {
setToggleChatBot(!toggleChatBot)
    }
  return (
    <>
    <button className="chatbot-toggler" onClick={openChatBot}>
    <span className="togg"><BiConversation className="togger"/></span>
    <span className="togg"><CgClose className="togger"/></span>
        </button>
        </>
  )
}

export default ChatToggler