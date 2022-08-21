import styled from "styled-components"
import { End } from "./ChatList";




const Form = styled.form`
    width: calc(98% - 60px);
    height: 45px;

    input {
        width: 70%;
        height: 40px;
    }

    button {
        width: 60px;
        height: 100%
    }
`



const ChatInput: React.FC<End>  = ({end}) => {


    return(
        <Form>
            <input type="text" placeholder="msg"/>
            <button type="submit" onClick={(e) => {
                e.preventDefault();
                end.current.current.scrollIntoView()
            }}>Send</button>
        </Form>
    )
}


export default ChatInput