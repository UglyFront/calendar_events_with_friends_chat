import styled from "styled-components"
import { ProfileImg } from "../Home/Profile"
import {MessageTwoTone, FileAddTwoTone, DeleteTwoTone} from "@ant-design/icons"
import {Item} from "../../comp/Friends/FriendsItem"
import { useNavigate } from "react-router-dom"
import { URL } from "../../store/asyncActions"






interface IItem {
    my?: boolean,
    id: string,
    profile?: any,
    isEvent? : boolean,
    event?: any
}

const ItemMsg: React.FC<IItem> = (props) => {
    let router = useNavigate()


    if (props.isEvent) {
        console.log(props.event)
        return (
            <Item onClick={() => {
                router(`/chats/${props.id}`)
            }}>
                <div className="wrapper">
                    <ProfileImg img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqp8miKPILJr5qyOaPJ3AK9e12km9h1UZqDA&usqp=CAU" min={true}/>
                    <p>{props.event.name}</p>
                </div>
                <div className="controlls" onClick={(e) => e.stopPropagation()}>
                    <DeleteTwoTone style={{cursor: "pointer", fontSize: "22px"}}/>
                </div>
            </Item>
        )
    } else {
        return (
            <Item onClick={() => {
                router(`/chats/${props.id}`)
            }}>
                <div className="wrapper">
                    {props.profile.img.length? 
                    <ProfileImg img = {`${URL}/${props.profile.img}`} min={true}/>
                    :
                    <ProfileImg img = "https://brilliant24.ru/files/cat/bg_template_01.png" min={true}/>
                    }
                    <p>{props.profile?.name}</p>
                </div>
                <div className="controlls" onClick={(e) => e.stopPropagation()}>
                    <DeleteTwoTone style={{cursor: "pointer", fontSize: "22px"}}/>
                </div>
            </Item>
        )
    }
}


export default ItemMsg