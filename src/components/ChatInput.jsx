import { useRef, useEffect, useContext } from "react"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useScreenshot } from 'use-react-screenshot'
import { BiMicrophone } from "react-icons/bi";
import { BiCamera } from "react-icons/bi";
import { BiSolidSend } from "react-icons/bi";
import  ChatBotContext  from "../context/chatBotContext"
const ChatInput = ( { handleChat } ) => {
   const { inputText, setInputText, inputInitHeight, setInputInitHeight, chatBotRef } = useContext(ChatBotContext)
   const [image, takeScreenshot] = useScreenshot()
   const getImage = () => takeScreenshot(chatBotRef.current)
   const { transcript } = useSpeechRecognition()
   useEffect(() => {
      const first = transcript.split(" ")[transcript.split(" ").length -1]
      setInputText(first)
   }, [transcript, setInputText])
const chatInputRef = useRef();
useEffect(() => {
   console.log(image)
      }, [image])
const handleInput = (e) => {
   setInputText(e.target.value)
   const height = `${chatInputRef.current.scrollHeight}px`
   if(chatInputRef.current){
   setInputInitHeight(height)
   }
}
const handleRecord = async () => {
   SpeechRecognition.startListening({ continuous: true })
}
const screenShot = () => {
getImage()
console.log(image)
}
const handleEnter = (e) => {
   console.log(e)
   if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
      e.preventDefault();
      handleChat()
  }
}
  return(   
     <div className="chat-input">
  <textarea placeholder="Enter a message..." value={inputText} onKeyDown = {handleEnter}  ref={chatInputRef} onChange={handleInput} style={{height : inputInitHeight}}/>
  <span id="photo-btn" className=" sendButton"
  onClick={screenShot}
  >
  { !image ? <BiCamera />
   : <a href={image} download="news" style={{color : "black"}}> <BiCamera /></a>}
  </span>
  <span id="mic-btn" className="" onClick={handleRecord}>
   <BiMicrophone />
  </span>
  <span id="send-btn" className="sendButton"  onClick={
   () => { handleChat()
      SpeechRecognition.stopListening();}
   
   }>
   <BiSolidSend /></span>
  </div>
  )
}

export default ChatInput
