import styled from "styled-components"
import { ProfileImg } from "../Home/Profile"
import {MessageTwoTone, FileAddTwoTone, DeleteTwoTone} from "@ant-design/icons"
import {Item} from "../../comp/Friends/FriendsItem"
import { useNavigate } from "react-router-dom"






interface IItem {
    my?: boolean,
    id: string
}

const ItemMsg: React.FC<IItem> = (props) => {
    let router = useNavigate()

    return (
        <Item onClick={() => {
            router(`/chats/${props.id}`)
        }}>
            <div className="wrapper">
                <ProfileImg img = "https://www.meme-arsenal.com/memes/566c9cf04de6c790122fc835ae032c23.jpg" min={true}/>
                <p>Имя Имя имяимяим</p>
            </div>
            <div className="controlls" onClick={(e) => e.stopPropagation()}>
                <DeleteTwoTone style={{cursor: "pointer", fontSize: "22px"}}/>
            </div>
        </Item>
    )
}


export default ItemMsg