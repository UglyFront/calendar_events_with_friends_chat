import styled from "styled-components"
import { ProfileImg } from "../Home/Profile"
import {MessageTwoTone, FileAddTwoTone, DeleteTwoTone} from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { addInvitesOnEvent } from "../../store/eventWithModal"
import { Friends } from "../../types/user"
import { actions } from "../../store/asyncActions"
import { profile } from "console"





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
    my?: boolean,
    profile: any,
    addEvent?: boolean,
    accept?: boolean,
    send?: boolean
}

const FriendsItem: React.FC<IItem> = (props) => {

    const dispatch = useAppDispatch()


    const user = useAppSelector(state => state.reducer.userReducer.user)

    return (
        <Item onClick={() => {
            if (props.addEvent) {
                dispatch(addInvitesOnEvent(props.profile))
            }
            setTimeout(() => {
                dispatch(actions.getFriends(user.id))
            }, 800)
        }}>
            <div className="wrapper">
                <ProfileImg img = "https://www.meme-arsenal.com/memes/566c9cf04de6c790122fc835ae032c23.jpg" min={true}/>
                <p>{props.profile.name}</p>
            </div>
            <div className="controlls">
                {props.my&&
                <>   <MessageTwoTone style={{cursor: "pointer", fontSize: "22px"}}/>
                <DeleteTwoTone onClick={() => {
                    alert(2)
                        dispatch(actions.deleteFriend({
                            sender: user.id,
                            reciver: props.profile.id
                        }))
               
                    }} style={{cursor: "pointer", fontSize: "22px"}}/></>
                }

                {props.send &&       <>  <FileAddTwoTone onClick={() => {
                        dispatch(actions.createFriend({
                            sender: user.id,
                            reciver: props.profile.id
                        }))
               
                    }} 
                    style={{cursor: "pointer", fontSize: "22px"}}/>
                <DeleteTwoTone 
                onClick={() => {
                    dispatch(actions.deleteFriend({
                        sender: user.id,
                        reciver: props.profile.id
                    }))
           
                }}
                style={{cursor: "pointer", fontSize: "22px"}}/></>}


                {props.accept &&       <>  <FileAddTwoTone onClick={() => {
                        dispatch(actions.acceptFriends({
                            sender: user.id,
                            reciver: props.profile.id
                        }))

                 
                    }} 
                    style={{cursor: "pointer", fontSize: "22px"}}/>
                <DeleteTwoTone
                onClick={() => {
                    dispatch(actions.deleteFriend({
                        sender: user.id,
                        reciver: props.profile.id
                    }))
           
                }}
                style={{cursor: "pointer", fontSize: "22px"}}/></>}
            </div>
        </Item>
    )
}


export default FriendsItem