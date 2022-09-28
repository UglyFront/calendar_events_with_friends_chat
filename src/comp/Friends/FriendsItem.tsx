import styled from "styled-components"
import { ProfileImg } from "../Home/Profile"
import {MessageTwoTone, FileAddTwoTone, DeleteTwoTone} from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { addInvitesOnEvent } from "../../store/eventWithModal"
import { Friends } from "../../types/user"
import { actions, URL } from "../../store/asyncActions"
import { notification } from "antd"
import { useNavigate } from "react-router-dom"
import { UserOther } from "../../types/eventWithModals"





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
    const friends = useAppSelector(state => state.reducer.userReducer.friends)


    const nav = useNavigate()

    return (
        <Item onClick={() => {
            if (props.addEvent) {
                dispatch(addInvitesOnEvent(props.profile))
                notification.success({
                    placement: 'bottomLeft',
                    message: `${props.profile.name} приглашен!`
                 })
            }
            setTimeout(() => {
                dispatch(actions.getFriends(user.id))
            }, 800)
        }}>
            <div className="wrapper">
            {props.profile?.img.length? 
                    <ProfileImg img = {`${URL}/${props.profile.img}`} min={true}/>
                    :
                    <ProfileImg img = "https://brilliant24.ru/files/cat/bg_template_01.png" min={true}/>
                    }
                <p>{props.profile?.name}</p>
            </div>
            <div className="controlls">
                {props.my &&
                <>   
                <MessageTwoTone style={{cursor: "pointer", fontSize: "22px"}} onClick={(e) => {
                    e.stopPropagation()
                    friends.forEach((el: any) => {
                        if (el.friend.id == props.profile.id) {
                            nav(`/chats/${el.id}`)
                        }
                    })
                }}/>
                {!props.addEvent && 
                <DeleteTwoTone onClick={async() => {
                        await dispatch(actions.deleteFriend({
                            sender: user.id,
                            reciver: props.profile.id
                        }))

                        notification.success({
                            placement: 'bottomLeft',
                            message: 'Удален друг'
                         })

                         setTimeout(() => {
                            dispatch(actions.getFriends(user.id))
                        }, 800)
               
                    }} style={{cursor: "pointer", fontSize: "22px"}}/>
                }
                    </>
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