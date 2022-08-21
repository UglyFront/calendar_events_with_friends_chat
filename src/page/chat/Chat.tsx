import { useRef } from "react"
import { useParams } from "react-router-dom"
import { StyledH2 } from "../../App"
import ChatInput from "../../comp/Chat/ChatInput"
import ChatList from "../../comp/Chat/ChatList"
import InfoChat from "../../comp/Chat/InfoChat"



const Chat: React.FC  = () => {
    const {id} = useParams()

    const end = useRef<any>()


    return(
        <>
            <StyledH2>Имя чата</StyledH2>
            <InfoChat/>
            <ChatList end={end}/>
            <ChatInput end={end}/>
        </>
    )
}


export default Chat