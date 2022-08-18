import styled from "styled-components"
import { ProfileImg } from "../Home/Profile"
import {MessageTwoTone, FileAddTwoTone, DeleteTwoTone} from "@ant-design/icons"





export const Item = styled.div`
    width: 280px;
    height: 70px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: 0px 0px 10px #a1a1a1;
    cursor: pointer;

    .wrapper {
        display: flex;

        p {
            width: 180px;
            font-size: 16px;
            margin-left: 10px;
        }
    }

    .controlls {
        width: 30px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
`



interface IItem {
    my?: boolean
}

const FriendsItem: React.FC<IItem> = (props) => {

    return (
        <Item>
            <div className="wrapper">
                <ProfileImg img = "https://www.meme-arsenal.com/memes/566c9cf04de6c790122fc835ae032c23.jpg" min={true}/>
                <p>Имя Имя имяимяим</p>
            </div>
            <div className="controlls">
                {props.my?
                    <MessageTwoTone style={{cursor: "pointer", fontSize: "22px"}}/>
                    :
                    <FileAddTwoTone style={{cursor: "pointer", fontSize: "22px"}}/>
                }
                <DeleteTwoTone style={{cursor: "pointer", fontSize: "22px"}}/>
            </div>
        </Item>
    )
}


export default FriendsItem