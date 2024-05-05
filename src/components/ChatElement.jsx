import { useContext } from "react";
import  { toast } from "react-hot-toast";
import { BiMicrophone } from "react-icons/bi";
import { BiClipboard } from "react-icons/bi";
import { BiSpeaker } from "react-icons/bi";
import { BiRefresh } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import { BiSolidDislike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import ChatBotContext from "../context/chatBotContext";
const ChatElement = ({ message, type, apiError, audio, error, id}) => {
  const { setMessages, messages } = useContext(ChatBotContext)
  const handlePlay = async () => {
          // Trigger download of audio file
          const audioBlob = await fetch(audio).then((response) => response.blob());
          console.log(audioBlob);

          const audioUrl = URL.createObjectURL(audioBlob);
          console.log(audioUrl);
    
          const audioElement = new Audio(audioUrl);
          audioElement.play();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message)
    .then(() => {
      toast.success("Text is copied to clipboard")
      console.log('Text copied to clipboard');
      // Optionally, you can show a success message or perform other actions here
    })
    .catch(err => {
      console.error('Could not copy text: ', err);
      // Handle any errors that might occur
    });
  }
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterance)
  }
  const handleDelete = () => {
    const update = messages.filter((chat) => chat.id !== id)
    setMessages(update)
  }
  return <>
    {type === "outgoing" ?  <li className="chat outgoing"><span className="potter"><FaRegUser /></span><p>{message}</p> </li> : 
<li className= "chat incoming">
    <span id="robot">
    <FaRobot size="1.5em" /></span><p className={error ? "error" : ""}>{message}
       
       { message !== "Thinking..." && 
        <div className='incoming-options' style={{cursor : "pointer"}}>

        <BiMicrophone style={{margin : "2%"}}
          onClick={handlePlay}
        /><BiClipboard style={{margin : "2%"}}
          onClick={handleCopy}
        /><BiRefresh style={{margin : "2%"}}
         />
        <BiSpeaker style={{margin : "2%"}}
        onClick={handleSpeak} />
        <BiLike 
          style={{margin : "2%"}}
        />
        <BiDislike 
          style={{margin : "2%"}}
        />
        <BiSolidTrashAlt
           onClick={handleDelete}
        style={{margin : "2%"}} />
        </div>
       }
    </p>
     </li>}    
  </>

  }
  export default ChatElement