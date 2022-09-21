import styled from "styled-components"
import { URL } from "../../store/asyncActions"


interface MyMsg {
    my?: boolean,
    text?: string,
    time?: string,
    audio?: string,
    userSend?: any,
    typeFile?: string,
    src?: string
}


const Item = styled.div<MyMsg>`

    width: 100%;
    min-height: 40px;
    max-height: 1000%;
    word-break: break-all;
    margin-bottom: 5px;
    position: relative;

    .msg {
        width: 280px;
        min-height: 40px;
        height: 100%;
        background: ${(props) => props.my ? " cyan":"#817FEF"};
        color: #fff;
        border-radius: 10px;
        padding: 5px;
        margin-left: ${(props) => props.my ? "calc(100% - 280px)":""};
        position: relative;
        padding-bottom: 25px;

        span {
            position: absolute;
            bottom: 0;
            right: 0
        }
    }
`



const ChatItem: React.FC<MyMsg>  = (props) => {
    if (props.audio?.trim()) {
        return(
            <Item my={props.my}>
                <div style={{background: "#fff"}} className="msg">
                    <audio style={{width: "250px"}} src={URL+`/${props.audio}`} controls></audio>
                </div>
            </Item>
        )
    }
    else if (props.typeFile === "image") {
        return (
            <Item my={props.my}>
                <div style={{background: "#fff"}} className="msg">
                    <img style={{width: "320px", height: "200px"}}src={`${URL}/${props.src}`}/>
                 </div>
            </Item>
        )
    }
    else if (props.typeFile === "video") {
        return (
            <Item my={props.my}>
                <div style={{background: "#fff"}} className="msg">
                    <video controls style={{width: "320px", height: "200px"}}src={`${URL}/${props.src}`}/>
                 </div>
            </Item>
        )
    }
    else if (props.typeFile === "audio") {
        return (
            <Item my={props.my}>
                <div style={{background: "#fff"}} className="msg">
                    <audio controls style={{width: "320px", height: "200px"}}src={`${URL}/${props.src}`}/>
                 </div>
            </Item>
        )
    }
    else if (props.typeFile === "application") {
        return (
            <Item my={props.my}>
                <div style={{background: "#fff"}} className="msg">
                    <a href={`${URL}/${props.src}`}>Файл...</a>
                 </div>
            </Item>
        )
    }
    else {
        return(
            <Item my={props.my}>
                <div className="msg">
                    {props.text}
                   <span>{props.time}</span>
                </div>
            </Item>
        )
    }
}


export default ChatItem