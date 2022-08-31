import styled from "styled-components"
import { End } from "./ChatList";
import {EditTwoTone, AudioTwoTone, PictureTwoTone} from "@ant-design/icons"
import { useRef } from "react";




const Form = styled.form`
    width: calc(98% - 230px);
    height: 45px;

    input {
        width: 70%;
        height: 40px;
        border: 0px;
        border-bottom: 1px solid #a1a1a1;
        outline: none;

        &:focus {
            border-bottom: 1px solid cyan;
        }
    }

    button {
        width: 60px;
        height: 40px;
        border: none;
        cursor: pointer;
    }

    label {
        padding-left: 20px;
        cursor: pointer;
    }

    input[type="file"] {
        display: none;
    }

    svg {
        font-size:16px;
    }
`



const ChatInput: React.FC<End>  = ({end, ws, chatId}) => {

    const inp = useRef<any>()


    return(
        <Form>
            <input ref={inp} type="text" placeholder="msg"/>
            <button type="submit" onClick={(e) => {
                e.preventDefault();

                if (inp.current.value.length >= 1) {
                    end.current.current.scrollIntoView()
                    ws.send(`${chatId}: ${inp.current.value}`)
                    inp.current.value = ""
                }
            }}><EditTwoTone /></button>


        <button onSubmit={(e) => {
                 e.preventDefault();
            }}><AudioTwoTone /></button>
        <input id="file" type="file"  accept="image/png, image/jpeg, ,.mp3, .mp4, .wav, .avi"/><label htmlFor="file"><PictureTwoTone /></label>
        </Form>
    )
}


export default ChatInput