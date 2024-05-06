import { useContext, useState } from "react";
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
import { useGenerateResponse } from "../hooks/useGenerateResponse";
import { usePlayChime } from "../hooks/usePlayChime";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { AiOutlineSound } from "react-icons/ai";
const ChatElement = ({ message, type, apiError, audio, error, id, time}) => {
  const { playChime } =usePlayChime()
  const { generateResponse } = useGenerateResponse()
  const { setMessages, messages } = useContext(ChatBotContext)
  const [like, setLike] = useState(false)
  const [dislike, setDisLike] = useState(false)

  const handlePlay = async () => {
    try{
        // Trigger download of audio file
          const audioBlob = await fetch(audio).then((response) => response.blob());
          console.log(audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          console.log(audioUrl);
          const audioElement = new Audio(audioUrl);
          audioElement.play();
    }catch(err){
      console.log(err)
      toast.success("Unable To Say Pronunciation")
    }
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
  const handleRefresh = async () => {
    console.log("gideon")
    let newArray = messages.slice(0, messages.length - 1);
    const incomingArray = [...newArray, {id : newArray[newArray.length - 1].id + 1, type: "incoming", message: "Thinking", error : false}] 
    setMessages(incomingArray)
    setTimeout( async() => {
      setMessages(incomingArray)
      const response = await generateResponse(incomingArray);
      setMessages(response)
      playChime()
    }, 1000)
  }
  return <>
    {type === "outgoing" ? <> <li className="chat outgoing"><span className="potter"><FaRegUser /></span><p>{message}</p>
   </li>
  { time && <span className="timestamp">{formatDistanceToNow(new Date(time), { addSuffix: true })}</span> }</>
    : 
<><li className= "chat incoming">
    <span id="robot">
    <FaRobot size="1.5em" /></span><p className={error ? "error" : ""}>{message} { message === "Thinking" &&  <div className="loaderdot"></div> }
       
       { message !== "Thinking" && 
        <div className='incoming-options' style={{cursor : "pointer"}}>

        <BiMicrophone style={{margin : "2%"}}
          onClick={handlePlay}
        /><BiClipboard style={{margin : "2%"}}
          onClick={handleCopy}
        /><BiRefresh style={{margin : "2%"}}
        onClick={handleRefresh}
         />
         <AiOutlineSound  style={{margin : "2%"}}
        onClick={handleSpeak} />
       { like ? 
        <BiSolidLike 
          style={{margin : "2%"}}
          onClick={() => setLike(!like)}
        />: <BiLike 
          style={{margin : "2%"}}
          onClick={() => setLike(!like)}
        /> }
       { 
        dislike ?
        <BiSolidDislike 
          style={{margin : "2%"}}
          onClick={() => setDisLike(!dislike)}
        /> : 
        <BiDislike 
          style={{margin : "2%"}}
          onClick={() => setDisLike(!dislike)}
        />
       }
        <BiSolidTrashAlt
           onClick={handleDelete}
        style={{margin : "2%"}} />
        </div>
       }
    </p>
     </li>
     { time && <span className="timestamp-left">{formatDistanceToNow(new Date(time), { addSuffix: true })}</span> }</>
     }    
  </>

  }
  export default ChatElement