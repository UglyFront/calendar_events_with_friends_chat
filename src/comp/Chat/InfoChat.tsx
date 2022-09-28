import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Friends from "../../page/friends/Friends"
import { actions, URL } from "../../store/asyncActions"
import { useAppSelector, useAppDispatch } from "../../store/store"

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


    const user = useAppSelector(state => state.reducer.userReducer.user)

    const dispatch = useAppDispatch()
    const nav = useNavigate()

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
            {event &&
                <>
                {user.id == event.ownerId?
                <p className="leave" onClick={() => {
                    let check = window.confirm("Чат и событие будут полностью удалены ДЛЯ ВСЕХ УЧАСТНИКОВ! Вы согласны?")

                    if (check) {
                        const body = {
                            eventId: event.id
                        }
                        dispatch(actions.deleteEvent(body))
                        nav("/chats")
                    }
                }}>Отменить событие</p>
            :
                <p className="leave" onClick={() => {
                    let check = window.confirm("Чат и событие будут полностью удалены! Вы согласны?")

                    if (check) {
                        const body = {
                            eventId: event.id,
                            userId: user.id
                        }
                        dispatch(actions.leaveEvent(body))
                        nav("/chats")
                    }
                }}>Покинуть чат</p>
            }
                </>
            }
        </AboutChat>
    )
}


export default InfoChat