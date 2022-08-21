import styled from "styled-components"


interface MyMsg {
    my?: boolean,
    text?: string
}


const Item = styled.div<MyMsg>`

    width: 100%;
    min-height: 40px;
    max-height: 100%;
    word-break: break-all;
    margin-bottom: 5px;
    position: relative;

    .msg {
        max-width: 200px;
        width: 100%;
        min-height: 40px;
        height: 100%;
        background: ${(props) => props.my ? " cyan":"#817FEF"};
        color: #fff;
        border-radius: 10px;
        padding: 5px;
        margin-left: ${(props) => props.my ? "calc(100% - 210px)":""};
    }
`



const ChatItem: React.FC<MyMsg>  = (props) => {

    return(
        <Item my={props.my}>
            <div className="msg">
                {props.text}
            </div>
        </Item>
    )
}


export default ChatItem