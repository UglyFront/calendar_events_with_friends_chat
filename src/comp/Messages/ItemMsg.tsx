import styled from "styled-components"
import { ProfileImg } from "../Home/Profile"
import {MessageTwoTone, FileAddTwoTone, DeleteTwoTone} from "@ant-design/icons"
import {Item} from "../../comp/Friends/FriendsItem"






interface IItem {
    my?: boolean
}

const ItemMsg: React.FC<IItem> = () => {

    return (
        <Item>
            <div className="wrapper">
                <ProfileImg img = "https://www.meme-arsenal.com/memes/566c9cf04de6c790122fc835ae032c23.jpg" min={true}/>
                <p>Имя Имя имяимяим</p>
            </div>
            <div className="controlls">
                <DeleteTwoTone style={{cursor: "pointer", fontSize: "22px"}}/>
            </div>
        </Item>
    )
}


export default ItemMsg