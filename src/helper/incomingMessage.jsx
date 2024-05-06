import { useContext } from "react";
import { useGenerateResponse } from "../hooks/useGenerateResponse";
import { usePlayChime } from "../hooks/usePlayChime";
import  ChatBotContext  from "../context/chatBotContext"
export default handleIncomingMessage = async (outgoingArray) => {
    const { generateResponse } = useGenerateResponse()
    const { 
        setMessages
      } = useContext(ChatBotContext)
    const { playChime } = usePlayChime()
    const newMessage = {
      id: outgoingArray[outgoingArray.length - 1].id + 1,
      type: "incoming",
      message: "Thinking",
      error: false
    };
  
    // Update messages state immediately with the "Thinking" message
    setMessages([...outgoingArray, newMessage]);
  
    // Call generateResponse immediately
    const response = await generateResponse([...outgoingArray, newMessage]);
    
    // Update messages state with the response from generateResponse
    setTimeout(() => {
      setMessages(response);
      playChime()
    }, 1000);
  };
  