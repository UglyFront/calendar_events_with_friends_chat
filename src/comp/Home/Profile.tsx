import styled from "styled-components"
import React, { useEffect } from "react"
import { StyledH3 } from "../../App"
import ListEvent from "./ListEvent"


interface ImgProps {
    img: string
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


const ProfileImg = styled.div<ImgProps>`
    width: 150px;
    height: 150px;
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
    bottom: 0;
    width: 100%;
    height: 20px;
    background: red;
    color: #fff;
    text-align: center;
    cursor: pointer;
}
`

const Profile: React.FC = () => {
    const [sidebar, setSidebar] = React.useState<boolean>(false)

    return (
        <>
        <ProfileAll>
        <WrapperProfile>
            <ProfileImg img = "https://www.meme-arsenal.com/memes/566c9cf04de6c790122fc835ae032c23.jpg"/>
            <div className="wrapper_text">
                <h2>Погода Данил Петрович</h2>
                <h3>Status StatusStatusStatus.</h3>
            </div>
        </WrapperProfile>
        <div className="friends" onClick={() => setSidebar(prev => !prev)}>Друзья</div>

        <ListEvent/>
        <ListEvent invites={true}/>
       



        <AsideFriends style={sidebar ? {transform: "translateX(0%)"} : {transform: "translateX(100%)"}}>
        <StyledH3>Ваши друзья</StyledH3>
      <ul>
        <li>1 друг</li>
        <li>1 друг</li>
        <li>1 друг</li>
    
        <li>1 друг</li>
        <li>1 друг</li>
      
        <li>1 друг</li>
        <li>1 друг</li>
  
        <li>1 друг</li>
        <li>1 друг</li>
        <li>1 друг</li>
        <li>1 друг</li>
  
        <li>1 друг</li>
        <li>1 друг</li>
        <li>1 друг</li>
        <li>1 друг</li>
  
        <li>1 друг</li>
        <li>1 друг</li>
      </ul>


      <div className="close" onClick={() => setSidebar(prev => !prev)}>X</div>
</AsideFriends>

        </ProfileAll>

</>
    )
}


export default Profile