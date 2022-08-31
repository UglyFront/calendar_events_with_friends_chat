import { PropertySafetyFilled } from "@ant-design/icons"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import { StyledH2 } from "../../App"
import ChatInput from "../../comp/Chat/ChatInput"
import ChatList from "../../comp/Chat/ChatList"
import InfoChat from "../../comp/Chat/InfoChat"



const Chat: React.FC<any>  = (props) => {
    const {id} = useParams()

    const end = useRef<any>()


        return(
            <>
                <StyledH2>Имя чата</StyledH2>
                <InfoChat/>
                <ChatList end={end}/>
                <ChatInput end={end} ws = {props.ws} chatId={id}/>
            </>
        )
}


export default Chat