import ChatBot from "./components/ChatBot"
import { ChatBotProvider } from "./context/chatBotContext"
function App() {
  return (
<>
<ChatBotProvider>
<ChatBot />
</ChatBotProvider>
    </>
  )
}

export default App
