import { PropertySafetyFilled } from "@ant-design/icons"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { StyledH2 } from "../../App"
import ChatInput from "../../comp/Chat/ChatInput"
import ChatList from "../../comp/Chat/ChatList"
import InfoChat from "../../comp/Chat/InfoChat"
import { actions, URL } from "../../store/asyncActions"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { setActiveChat } from "../../store/user"



const Chat: React.FC<any>  = (props) => {
    const {id} = useParams()

    const end = useRef<any>()
    const dispatch = useAppDispatch()


    const [file, setFile] = useState([])


    const [includeChat, setIncludeChat] = useState<boolean>(false)

    const user = useAppSelector(state => state.reducer.userReducer.user)

    const [friend, setFriend] = useState<any>()
    const [event, setEvent] = useState<any>()


    useEffect(() => {
        dispatch(setActiveChat(id!))

        let body = {}

        


        if (+id!) {
            body = {
                userId: user.id,
                friendChatId: +id!
            }


            fetch(`${URL}/user/${id}/${user.id}`).then(res => res.json()).then(data => setFriend(data))
        } else {
            let arrIdToString: any = id?.split("e")
            let idEvent = +arrIdToString[0]

            body = {
                userId: user.id,
                eventId: idEvent
            }

            fetch(`${URL}/event/current/${idEvent}`).then(res => res.json()).then(data => {
                console.log(data)
                setEvent(data)
            })
        }


        fetch(`${URL}/event/check_chat`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                setIncludeChat(true)
                dispatch(actions.getMessageChat(String(id)))
            } else {
                setIncludeChat(false)
            }
        })




        return () => {
            dispatch(setActiveChat(""))
        }
    }, [])




    if (includeChat) {
        return(
            <>
                <StyledH2>{friend?.name || event?.name}</StyledH2>
                <InfoChat friend = {friend} event={event}/>
                <ChatList end={end} file={file} setFile={setFile}/>
                <ChatInput  end={end} ws = {props.ws} chatId={id} file={file} setFile={setFile}/>
            </>
        )   
    } else {
        return(
        <StyledH2>Нет доступа</StyledH2>
        )
    }
}


export default Chat