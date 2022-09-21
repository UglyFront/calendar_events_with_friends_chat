import styled from "styled-components"
import React, { useEffect } from "react"
import { StyledH3 } from "../../App"
import ListEvent from "./ListEvent"
import FriendsItem from "../Friends/FriendsItem"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { statusFriends } from "../../types/user"
import { URL } from "../../store/asyncActions"
import { updateImg } from "../../store/user"


export interface ImgProps {
    img: string,
    min?: boolean
}



const ProfileAll = styled.div`
    width: 100%;
    height: 100%;

    .friends {
        padding: 10px;
        width: 100px;
        border: 0px;
        background: #a1a1a1;
        color: #fff;
        border-radius: 10px;
        transition: .3s;
        cursor: pointer;
        text-align: center;
    
        &:hover {
          background: #817FEF
        }
    }
`


const WrapperProfile = styled.div`
    width: 100%;
    height: 200px;
    margin-top: 20px;
    display: flex;

    .wrapper_text {
        margin-left: 15px;
        width: 400px;

        h2 {
            font-weight: 400;

            &::first-letter {
                color: #817FEF;
            }
        }

        h3 {
            font-weight: 300;
            font-size: 16px
        }
    }
`


export const ProfileImg = styled.div<ImgProps>`
    width: ${(props) => props.min? "60px": "150px"};
    height:  ${(props) => props.min? "60px": "150px"};
    background: url(${(props) => props.img}) center no-repeat;
    background-size: cover;
    border-radius: 50%;
    flex-shrink: 0;
`


interface StyleProps {
    style: any
}
export const WrapperEvent = styled.div<StyleProps>`
    width: 70%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    overflow: hidden;
    transition .4s ease-in;
`

export const Event = styled.div`
    width: 300px;
    min-height: 150px;
    height: 100%;
    margin-top: 15px;
    margin-right: 15px;
    cursor: pointer;
    transition: 1s;
    word-break: break-all;
    position: relative;
    padding: 5px;
    box-shadow: 0px 0px 20px #a1a1a1;

    &:hover {
        transform: scale(1.01);
    }

    h5 {
        font-weight: 400;
    }
`

const AsideFriends = styled.aside<StyleProps>`
width: 300px;
height: 100vh;
background: #fff;
position: fixed;
right: 0;
top: 0;
transition: .3s;
z-index: 22;
box-shadow: 0px 15px 40px 0px #000;
transition: .5s;

.close {
    position: absolute;
    top: 0;
    left: 0;
    width: 25px;
    height: 25px;
    background: red;
    color: #fff;
    text-align: center;
    cursor: pointer;
}
`

const Profile: React.FC = () => {
    const [sidebar, setSidebar] = React.useState<boolean>(false)
    const user = useAppSelector(state => state.reducer.userReducer.user)
    const friends = useAppSelector(state => state.reducer.userReducer.friends)

    const dispatch = useAppDispatch()

    function sendAvatar(e: any) {
        let check = window.confirm("Меняем аватар?")
        if(check) {
            const data = new FormData()

            data.append("id", String(user.id))
            data.append("img", e.target.files[0])


            fetch(`${URL}/user/img`, {
                method: "POST",
                body: data
            }).then(res =>  res.json())
            .then(data => {
            dispatch(updateImg(data.img))
            setTimeout(() => {
                localStorage.removeItem("userAuth")
                localStorage.setItem("userAuth", JSON.stringify([{...user, img: data.img}]))
            }, 0)
            })

        
        } 
    }

    console.log(user)

    return (
        <>
        <ProfileAll>
        <WrapperProfile>
            <input id="avatar" onChange = {(e) => sendAvatar(e)} type="file" style={{display: "none"}} accept=".png, .jpg"/>
           <label htmlFor="avatar">
           {user?.img?.length? 
                    <ProfileImg img = {`${URL}/${user.img}`}/>
                    :
                    <ProfileImg img = "https://brilliant24.ru/files/cat/bg_template_01.png"/>
                    }
           </label>
            <div className="wrapper_text">
                <h2>{user.name || 341}</h2>
                {/* <h3>{user.statusText || "Empty"}</h3> */}
            </div>
        </WrapperProfile>
        <div className="friends" onClick={() => setSidebar(prev => !prev)}>Друзья</div>

        <ListEvent/>
        <ListEvent invites={true}/>
       



        <AsideFriends style={sidebar ? {transform: "translateX(0%)"} : {transform: "translateX(100%)"}}>
        <StyledH3 style={{marginBottom: "20px"}}>Ваши друзья</StyledH3>
      <ul>
           {friends.map((el: any) =>  {
                        if (el.status == statusFriends.ACCEPT) {
                            return <FriendsItem my={true} profile={el.friend}/>
                        }
                    })}
      </ul>

      <StyledH3 style={{marginBottom: "20px"}}>Ожидаем действия</StyledH3>
      <ul>
           {friends.map((el: any) =>  {
                        if (el.status == statusFriends.SEND && el.sender === user.id) {
                            return <FriendsItem profile={el.friend} my={true}/>
                        }
                    })}
      </ul>

      <StyledH3 style={{marginBottom: "20px"}}>Хотят дружить</StyledH3>
      <ul>
           {friends.map((el: any) =>  {
                        if (el.status == statusFriends.SEND && el.reciver === user.id) {
                            return <FriendsItem profile={el.friend} accept={true}/>
                        }
                    })}
      </ul>



      <div className="close" onClick={() => setSidebar(prev => !prev)}>X</div>
</AsideFriends>

        </ProfileAll>

</>
    )
}


export default Profile