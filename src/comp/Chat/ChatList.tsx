import { useEffect, useRef } from "react"
import styled from "styled-components"
import ChatItem from "./ChatItem"

const List = styled.div`
    width: 70%;
    height: 70vh;
    margin-top: 5px;
    scroll-behavior: smooth;
    margin-top: 20px;

    &::-webkit-scrollbar {
        width: 1px;
      }

      .end {
        width:5px;
        height:5px;
      }
`


const msg = [
    {
        my: true,
        text: "43435434351351354343513513543435135135135135"
    },
    {
        my: true,
        text: "43435434351351354343513513543435135135135135"
    },
    {
        my: false,
        text: "43435434351351354343513513543435135135135135"
    },
    {
        my: false,
        text: "43435434351351354343513513543435135135135135"
    },
    {
        my: false,
        text: "43435434351351354343513513543435135135135135"
    },
    {
        my: false,
        text: "43435434351351354343513513543435135135135135"
    },
    {
        my: false,
        text: "43435434351351354343513513543435135135135135"
    },
    {
        my: true,
        text: "43435434351351354343513513543435135135135135"
    },
    {
        my: true,
        text: "43435434351351354343513513543435135135135135"
    },
    {
        my: true,
        text: "43435434351351354343513513543435135135135135"
    },
    {
        my: true,
        text: "43435434351351354343513513543435135135135135"
    },
    {
        my: true,
        text: "ааааааааааааааааааа"
    },    {
        my: true,
        text: "531351355555555555555555555555555555555555555555555555555555555555555555555555555555555313513555555555555555555555555555555555555555555555555555555555555555555555555555555553135135555555555555555555555555555555555555555555555555555555555555555555555555555555"
    },
]


export interface End {
    end: any,
}
const ChatList: React.FC<End>  = (props) => {
    
    const end = useRef<any>()
    const list = useRef<any>()

    function fetch() {
        if(list.current.scrollTop === 0) {
            console.log(`fetchPrev`)
        }
    }

    useEffect(() => {
        props.end.current = end
        end.current.scrollIntoView()


        list.current.addEventListener("scroll",fetch)
    }, [])

    return(
        <List ref={list}>
            {msg.map(el => <ChatItem my={el.my} text={el.text}/>)}
            <div className="end" ref={end}></div>
        </List>
    )
}


export default ChatList