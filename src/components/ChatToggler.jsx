const ChatToggler = ({toggleChatBot, setToggleChatBot}) => {
    const openChatBot = () => {
setToggleChatBot(!toggleChatBot)
    }
  return (
    <>
    <button className="chatbot-toggler" onClick={openChatBot}>
    <span className="material-symbols-outlined mode_comment">mode_comment</span>
    <span className="material-symbols-outlined close">close</span>
        </button>
        </>
  )
}

export default ChatToggler