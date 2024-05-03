import  { toast } from "react-hot-toast";
import { BiMicrophone } from "react-icons/bi";
import { BiClipboard } from "react-icons/bi";
import { BiSpeaker } from "react-icons/bi";
import { BiRefresh } from "react-icons/bi";
const ChatElement = ({ message, type, apiError, audio, error}) => {
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
  // function Microphone() {
  //   return createElement(
  //     'i',
  //     { className: 'bx bxs-microphone',
  //      style : { backgroundColor : "transparent", color : "black", padding : "1%", cursor : "pointer"},
  //       onClick: handlePlay },
  //     ''
  //   );
  // }
  // function  Clipboard() {
  //   return createElement(
  //     'i',
  //     { className: 'bx bx-clipboard',
  //      style : { backgroundColor : "transparent", color : "black", padding : "1%", cursor : "pointer"},
  //       onClick: handleCopy },
  //     ''
  //   );
  // }
  // function Speaker(){
  //   return createElement(
  //     "i",
  //     {className: "bx bx-speaker",
  //     style : { backgroundColor : "transparent", color : "black", padding : "1%", cursor : "pointer"},
  //     onClick : handleSpeak
  //   }
  //   )
  // }
  return <>
    {type === "outgoing" ?  <li className="chat outgoing"><span className="material-symbols-outlined">person</span><p>{message}</p> </li> : 
<li className= "chat incoming">
    <span id="robot" className="material-symbols-outlined">smart_toy</span><p className={error ? "error" : ""}>{message}
        <div className='incoming-options' style={{cursor : "pointer"}}>
        <BiMicrophone
          onClick={handlePlay}
        /><BiClipboard 
          onClick={handleCopy}
        /><BiRefresh />
        <BiSpeaker
        onClick={handleSpeak} />
        </div>
    </p>
     </li>}    
  </>

  }
  export default ChatElement