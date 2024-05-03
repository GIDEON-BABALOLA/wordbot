import { CgClose } from "react-icons/cg";
const chatHeader = ({setToggleChatBot, toggleChatBot}) => {
  return (
    <>
    <section className="header">
            <div>            <h2>WordBot</h2></div>
            <span className=""
            onClick={
            () =>
              setToggleChatBot(!toggleChatBot)}
            ><CgClose /></span>
        </section>
        </>
  )
}

export default chatHeader