
import styled from "styled-components"
import { End } from "./ChatList";
import {EditTwoTone, AudioTwoTone, PictureTwoTone, RightCircleTwoTone} from "@ant-design/icons"
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Alert } from "antd";
import {useState} from "react"
import { URL } from "../../store/asyncActions";




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


const ChatInput  = ({end, ws, chatId, file, setFile}) => {

    const inp = useRef()

    const user = useAppSelector(state => state.reducer.userReducer.user)


    const [v, setV] = useState(false)




    const stopButtonRef = useRef()

    function audioMsg() {
        navigator
        .mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(function (stream) {
          console.log(stream)

       
            const options = { mimeType: 'audio/webm' };
            let recordedChunks = [];
            const mediaRecorder = new MediaRecorder(stream, options);

            mediaRecorder.addEventListener('dataavailable', function (e) {
                recordedChunks.push(e.data);
                console.log(e)
            });

            mediaRecorder.addEventListener('stop', function () {

                  
              console.log(recordedChunks)
              let blo2b = new Blob(recordedChunks,  {type: "audio/webm"})
              recordedChunks = []
              const file = new File([blo2b], `${user.id}${Date.now()}`, {type: "audio/webm"})
              console.log(file)
              let data = new FormData()
              let date = new Date
              let h = date.getHours()
              let m = date.getMinutes()

              let mm;


              if (m >= 0 && m <= 9) {
                mm = `0${m}`
              } else {
                mm = m
              }

              let t = `${h}:${mm}`
           

              data.append("audio", file)
              data.append("sender", user.id)       
              data.append("time", `${t}`)
              data.append("chatid", chatId)


              fetch(`${URL}/msg/voice`, {
                method: "POST",
                body: data
              })
              .then(res => res.json())
              .then(data => {
                const body = {
                    ...data,
                    chatId: data.chatid,
                    type: "msg",
                    user: {
                        id: user.id,
                        name: user.name,
                        img: user.img,
                    }
                }

                ws.send(JSON.stringify(body))
              })

     

            });

            if (stopButtonRef && stopButtonRef.current)
                stopButtonRef?.current?.addEventListener('click', function onStopClick() {
                    mediaRecorder.stop();


                    this.removeEventListener('click', onStopClick)
                });


            mediaRecorder.start();
        });
    }


    return(
        <Form>
            {file.length ?
             <>
             {file.map(el => <div> {el.name}<span style={{color: "red", cursor: "pointer"}} 
             onClick={() => setFile(prev => {
               return prev.filter(el2 => el2.name != el.name)
             })}> delete</span></div>)}
             </>
                :
                <input ref={inp} type="text" placeholder="msg"/>
            }
            <button type="submit" onClick={(e) => {
                e.preventDefault();

                let date = new Date()
                let time = ""

                let h = date.getHours()
                let m = date.getMinutes()


                if (m < 10) {
                    m = `0${m}`
                }                

                time = `${h}:${m}`

                if (inp.current?.value.length >= 1 && !file.length) {
                    end.current.current.scrollIntoView()
                    ws.send(JSON.stringify({
                        type: "msg",
                        chatId,
                        text: inp.current.value,
                        time: time,
                        user: {
                            id: user.id,
                            name: user.name,
                            img: user.img,
                        },
                        audio: ""
                    }))
                    inp.current.value = ""
                } else {
                    file.forEach(el => {
                        console.log(el)
                        let type = el.type.split("/")[0]
                        
                        let data = new FormData()

                        data.append('file', el)
                        data.append('typeFile', type)
                        data.append('audio', "")
                        data.append("sender", user.id)       
                        data.append("time", `${time}`)
                        data.append("chatid", chatId)


                     

                        fetch(`${URL}/msg/file`, {
                            method: "POST",
                            body: data
                        }).then(res => res.json())
                        .then(data => {
                            console.log(data)
                            const body = {
                                type: "msg",
                                ...data,
                                chatId: data.chatid,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    img: user.img,
                                },
                            }

                            console.log(body, 2323)
                            console.log(ws)


                            ws.send(JSON.stringify(body))


                            setFile([])
                        })


                    })
                }
            }}><EditTwoTone /></button>


        <button>

            {v?
                <div ref={stopButtonRef}>   <RightCircleTwoTone onClick={(e) => {
                    e.preventDefault()
                    audioMsg()
                    setV(false)}} /></div>
            :
            <AudioTwoTone onClick={(e) => {
                e.preventDefault()
                audioMsg()
                setV(true)
            }}/>
            }

            </button>
        <input 
        onChange={(e) => {
            setFile((prev) => {
                return [...prev, ...e.target.files]
            })
        }}
        id="file" type="file"  accept="image/png, image/jpeg, ,.mp3, .mp4, .wav, .avi"/><label htmlFor="file"><PictureTwoTone /></label>
        </Form>
    )
}


export default ChatInput