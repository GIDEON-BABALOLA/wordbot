import { CgClose } from "react-icons/cg";
const chatHeader = ({setToggleChatBot, toggleChatBot}) => {
  return (
    <>
    <section className="header">
            <div className="header-contain">            <h2>WordBot</h2>
            <span className="spanner"
            onClick={
            () =>
              setToggleChatBot(!toggleChatBot)}
            ><CgClose /></span></div>
          
        </section>
        </>
  )
}

export default chatHeader