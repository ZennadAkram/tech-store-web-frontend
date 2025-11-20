import { AppBarChatbot } from "../components/appbar"
import { ChatBody } from "../components/body"
import { TextField } from "../components/text_field"

export function ChatboPage(){
    return <div className="flex flex-col h-screen ">
        <AppBarChatbot/>
        <ChatBody/>
        <TextField/>
    </div>
}