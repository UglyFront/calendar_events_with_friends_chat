import styled from "styled-components"
import Friends from "../../page/friends/Friends"
import { URL } from "../../store/asyncActions"

const AboutChat = styled.div`

    width: 100%;
    height: 70px;
    margin-top: 30px;
    display: flex;
    position: relative;

    img {
        width: 70px;
        height: 70px;
        background: green;
        border-radius: 50%;
    }

    .text {
        width: 380px;
        height: 50px;
        margin-left: 10px;
        display: flex;
        overflow: hidden;
        
        p {
            height: 100%;
            overflow: hidden;
        }
    }

    .leave {
        position: absolute;
        right: 0;
        margin-top: 25px;
        color: red;
        cursor: pointer;
    }

`


interface IInfoChat {
    friend?: any
    event?: any
}



const InfoChat: React.FC<IInfoChat>  = ({friend, event}) => {

    return(
        <AboutChat>
            {
            friend?.img?.length?
            <img src={`${URL}/${friend?.img}`} alt="" />
            :
            <img src='https://brilliant24.ru/files/cat/bg_template_01.png' alt="" />
            }
            <div className="text">
                {friend? 
                <>             
                   <h3>{friend?.name}</h3>
                  {/* <div>{friend.status}</div> */}
                  </>
                :
                <>
                <p>               
                <h3>{event?.name}</h3>
                <p>Участников {event?.invites.length}</p>
                </p>
               </>
                }
            </div>
            <p className="leave">Покинуть чат</p>
        </AboutChat>
    )
}


export default InfoChat