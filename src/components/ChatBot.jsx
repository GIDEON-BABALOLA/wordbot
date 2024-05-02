import { useState, useRef, useEffect} from "react"
import toast, { Toaster } from "react-hot-toast";
import ChatHeader from "./ChatHeader"
import ChatBox from "./ChatBox"
import ChatInput from "./ChatInput"
import ChatToggler from "./ChatToggler"
import { useGenerateResponse } from "../hooks/useGenerateResponse";
import { usePlayChime } from "../hooks/usePlayChime";
const  ChatBot = () => {
  const { generateResponse, error, isLoading } = useGenerateResponse()
  const { playChime } = usePlayChime()
  const chatBoxRef = useRef()
  const chatBotRef = useRef()
  const fullPage = useRef()
    const [toggleChatBot, setToggleChatBot] = useState(false)
    const [inputText, setInputText] = useState("")
    const [inputInitHeight, setInputInitHeight] = useState("50px")
    const [messages, setMessages] = useState([{id : 1, type : "outgoing", message : "Start By saying Hi"}])
    let userMessage
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
    const scrollToBottom = () => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTo({
          top: chatBoxRef.current.scrollHeight,
          behavior: 'smooth' // Optional smooth scrolling
        });
      }
    };
    const handleChat = async () => {
      userMessage = inputText.trim();
      if(!userMessage){
        toast.error("Enter A Message")
return //closes the function;
      }  // if no message
      // //Resetting the textarea height to its default height once a message is sent
      setInputInitHeight("50px")
       //Append the users message to the chatbox
       const outgoingArray = [...messages, {id : messages[messages.length - 1].id + 1, type: "outgoing", message: userMessage}]
       playChime()
       setMessages(outgoingArray)
       setInputText("")                            
    const incomingArray = [...outgoingArray, {id : outgoingArray[outgoingArray.length - 1].id + 1, type: "incoming", message: "Thinking...", error : false}] 
    const response = await generateResponse(incomingArray);
    isLoading === null ? setMessages(incomingArray) :      setMessages(response)
    playChime()
      }

  return (
    <>
<Toaster />
    <section className={toggleChatBot ? "show-chatbot" : ""} ref={fullPage}>
    <ChatToggler toggleChatBot={toggleChatBot} setToggleChatBot={setToggleChatBot}/>
    <div className="chatbot" ref={chatBotRef}>
        <ChatHeader setToggleChatBot={setToggleChatBot} toggleChatBot={toggleChatBot}/>
        <ChatBox messages={messages} chatBoxRef={chatBoxRef} apiError={error}/>
        <ChatInput setInputText={setInputText}
        handleChat={handleChat}
        inputInitHeight={inputInitHeight}
        setInputInitHeight={setInputInitHeight}
        inputText={inputText}
        chatBotRef={chatBotRef}
        fullPage={fullPage}

        />
    </div>
    </section>
    </>
  )
}
export default ChatBot