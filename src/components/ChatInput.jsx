import { useRef, useEffect } from "react"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useScreenshot } from 'use-react-screenshot'
const ChatInput = ( { inputText, setInputText, handleChat, inputInitHeight, setInputInitHeight, chatBotRef } ) => {
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
  { !image ? <i className="bx bxs-camera"></i>
   : <a href={image} download="news" style={{color : "black"}}> <i className="bx bxs-camera"></i></a>}
  </span>
  <span id="mic-btn" className="material-symbols-outlined" onClick={handleRecord}>mic</span>
  <span id="send-btn" className="sendButton"  onClick={
   () => { handleChat()
      SpeechRecognition.stopListening();}
   
   }>
   <i className="bx bxs-send"></i></span>
  </div>
  )
}

export default ChatInput
