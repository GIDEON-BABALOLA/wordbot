const chatHeader = ({setToggleChatBot, toggleChatBot}) => {
  return (
    <>
    <section className="header">
            <div>            <h2>WordBot</h2></div>
            <span className=" close-btn material-symbols-outlined"
            onClick={
            () =>
              setToggleChatBot(!toggleChatBot)}
            >close</span>
        </section>
        </>
  )
}

export default chatHeader