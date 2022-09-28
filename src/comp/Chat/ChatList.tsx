import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useAppSelector } from "../../store/store"
import ChatItem from "./ChatItem"

const List = styled.div`
    width: 100%;
    height: 70vh;
    margin-top: 5px;
    scroll-behavior: smooth;
    margin-top: 20px;

    &::-webkit-scrollbar {
        width: 1px;
      }

      .end {
        width:15px;
        height:15px;
      }

      .arrow {
        position: sticky;
        bottom: 0;
        left: 100%;
        width: 40px;
        height: 40px;
        background: rgba(0,0,0,0.4);
        transition: .3s;
        cursor: pointer;
        transform: rotate(90deg);
        color: #fff;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background: rgba(0,0,0,0.9);
        }
      }
`



export interface End {
    end: any,
    ws?: any,
    chatId?: string | undefined,
    file?: any,
    setFile?: any
}
const ChatList: React.FC<End>  = (props) => {
    
    const end = useRef<any>()
    const list = useRef<any>()

    const msg = useAppSelector(state => state.reducer.userReducer.msgActiveChat)
    const user = useAppSelector(state => state.reducer.userReducer.user)


    const [arrow, setArrow] = useState<boolean>(false)


    function handlerScroll() {
        if(list.current.scrollTop === 0) {
            console.log(`fetchPrev`)
        }
        if((list.current.scrollHeight - list.current.scrollTop) - list.current.clientHeight > 500) {
            setArrow(true)
        }
        else {
            setArrow(false)
        }
    }

    useEffect(() => {
        props.end.current = end
        end.current.scrollIntoView()
        list.current.addEventListener("scroll", handlerScroll)


        return () => {
            list.current?.removeEventListener("scroll", handlerScroll)
        }
    }, [msg])

    return(
        <List ref={list}
        onDragStart={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}

        onDrop={(e) => {
            e.preventDefault()
            props.setFile((prev: any) => {
                const files = []
                for (let i = 0; i < e.dataTransfer.files.length; i++) {
                    files.push(e.dataTransfer.files[i])
                }
                return [...prev, ...files]
            })
        }}
        >
            {msg.map(el => <ChatItem  key = {el.id} time={el.time} src={el.src} typeFile={el.typeFile} my={el.user.id == user.id? true:false} text={el.text} audio={el.audio} userSend={el.user}/>)}
            <div className="end" ref={end}></div>
            <div className="arrow" onClick={() => end.current.scrollIntoView()} style={arrow ? {transform: "translateX(0%) rotate(90deg)"}:{transform: "translateX(100%) rotate(90deg)"}}>{">"}</div>
        </List>
    )
}


export default ChatList