import { useAppDispatch, useAppSelector } from './store/store';
import { incrementYear, decrementYear, changeMonth, setYear, upRangeYear, downRangeYear, setMonth } from './store/calendar';
import Header from './comp/Header/Header';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Event from './page/event/Event';
import { setEventModalVisible, setVisibleMonth, setVisibleYear, setHandler, setCreateEventModalVisible, setColorNewEvent, setNameNewEvent, setdDescriptionNewEvent, setStartNewEvent, setEndNewEvent, setModalAuth, setVisible, deleteInviteOnEvent } from './store/eventWithModal';
import {UpOutlined, DownOutlined} from "@ant-design/icons"
import { months } from './model/calendar';
import { IEvent } from './types/eventWithModals';
import Home from './page/home/Home';
import Friends from './page/friends/Friends';
import Messages from './page/messages/Messages';
import { createGlobalStyle } from 'styled-components';
import FriendsItem from './comp/Friends/FriendsItem';
import Chat from './page/chat/Chat';
import {actions, URL} from "./store/asyncActions"
import { pushMsgActiveChat, setLogout, setUser } from './store/user';
import { statusFriends } from './types/user';
import { notification } from 'antd';
import 'antd/dist/antd.css';




export interface IStyledHeader {
  visible: boolean,
  handlerEvent?: boolean,
  createEventModalVisible?: boolean,
  eventModalVisible?: boolean,
  visibleYear?: boolean,
  visibleMonth?: boolean,
  modalAuth?: boolean
}



const Wrapper = styled.div`
  display: flex;
  overflow-y: hidden;
`


const Content = styled.div<IStyledHeader>`
  // max-width: ${({visible}) => visible ? "100vw" : "calc(100vw - 90px)"};
  width: 100%;
  position: absolute;
  left: ${({visible}) => visible ? "90px" : "0px"};
  top: 0;
  transition: .3s;
  min-height: calc(100vh - 20px);
  padding: 20px 30px 0px 60px;
  z-index: ${({visibleMonth, visibleYear ,handlerEvent, createEventModalVisible, eventModalVisible, modalAuth}) => visibleMonth || visibleYear || handlerEvent || createEventModalVisible || eventModalVisible || modalAuth ? "-100" : "1"};
`

export const StyledH2 = styled.h2`
  color: #000;
  font-size: 24px;
  font-weight: 400;



&::first-letter {
  color: #817FEF;
}
`


export const StyledH3 = styled.h2`
  color: #000;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin-top: 10px;



&::first-letter {
  color: #817FEF;
}
`



const ExitButton = styled.button`
  weight: 125px;
  height: 40px;
  position: absolute;
  right: 40px;
  top: 20px
`


export const BlockedZone = styled.div`
  position: fixed,
  left: 0;
  top: 0;
  width: 100vw;
  height: 110vh;
  background: rgba(0,0,0,0.7);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  //margin-left: -90px;
  transition: .3s;
  cursor: pointer;
`




const BlockedZoneSelect = styled.div`
  width: 320px;
  height: 400px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    font-weight: bold;

    p {
      margin-left: 20px;
      width: 60px;
      cursor: pointer
    }
  }
`
const EventsWrapper = styled.div`
width: 300px;
height: 500px;
background: #fff;
overflow-y: scroll;

&::-webkit-scrollbar {
  width: 5px
}
`

const AddEventModal = styled.div`
  width: 300px;
  height: 550px;
  background: #fff;
  padding: 10px 10px;
  cursor: auto;

  h3 {
    font-weight: 400;
    text-align: center;
    margin-bottom: 20px;


    &::first-letter {
      color: #817FEF;
    }
  }

  input {
    width: 100%;
    height: 25px;
    margin-top: 10px;
    outline: none;
    border: none;
    border-bottom: 1px solid #a1a1a1;
  }

  span {
    display: block;
    color: red;
    margin-bottom: 5px;
    font-size: 12px
  }

  section {
    width: 100%;
    height: 150px;
    overflow-y: scroll;
    margin-top: 10px;

    p {
      width: 275px;
      height: 50px;
    }
  }


  button {
    width: 60%;
    display:block;
    margin: 0 auto;
    border: 0px;
    background: #a1a1a1;
    color: #fff;
    padding: 10px 10px;
    border-radius: 10px;
    transition: .3s;
    cursor: pointer;

    &:hover {
      background: #817FEF
    }
  }
`


const FlexWrapperBlockedZone = styled.div`
  width: 100%;
  padding: 10px 10px;
  height: 200px;

  button {
    width: 60%;
    height: 50px;
    border: 0px;
    background: #a1a1a1;
    color: #fff;
    border-radius: 10px;
    transition: .3s;
    cursor: pointer;

    &:hover {
      background: #817FEF
    }
  }
`


export const AsideFriends = styled.aside`
  width: 300px;
  height: 100vh;
  background: #fff;
  position: fixed;
  right: 0;
  top: 0;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1px;
  }
`


interface Modal {
  visibleMonth: boolean,
  visibleYear: boolean,
  eventModalVisible: boolean,
  createEventModalVisible: boolean,
  handlerEvent: boolean,
  modalAuth: boolean
}

const GlobalStyle = createGlobalStyle<Modal>`
 * {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: 'Montserrat', sans-serif;
  overflow: ${({handlerEvent, visibleMonth, visibleYear, eventModalVisible, createEventModalVisible, modalAuth}) => visibleMonth || visibleYear || eventModalVisible || createEventModalVisible || modalAuth || handlerEvent? "hidden" : ""};

  p, img, div, svg {
    margin: 0;
    padding: 0;
  }

}

`



function App(props: any): JSX.Element {


  //let wss: any = React.useRef(new WebSocket(`wss://apipipi.ru/websocket`))

  //let wss: any = React.useRef(new WebSocket(`ws://localhost:6601`))


  //let ws: any = wss.current

  let ws = props.ws

  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.reducer.userReducer.auth)
  const visibleYear = useAppSelector(state => state.reducer.headerReducer.visibleYear)
  const visibleMonth = useAppSelector(state => state.reducer.headerReducer.visibleMonth)
  const handlerEvent = useAppSelector(state => state.reducer.headerReducer.handlerEvent)
  const createEventModalVisible = useAppSelector(state => state.reducer.headerReducer.createEventModalVisible)
  const eventModalVisible = useAppSelector(state => state.reducer.headerReducer.eventModalVisible)
  const visibleHeader = useAppSelector(state => state.reducer.headerReducer.visible)
  const modalAuth = useAppSelector(state => state.reducer.headerReducer.modalAuth)
  const user = useAppSelector(state => state.reducer.userReducer.user)

  const friends = useAppSelector(state => state.reducer.userReducer.friends)
  const events = useAppSelector(state => state.reducer.headerReducer.events)

  const activeChat = useAppSelector(state => state.reducer.userReducer.activeChat)

  useEffect(() => {
    let userAuthStorage = window.localStorage.getItem("userAuth")
    
    if (userAuthStorage && !auth) {
      let userStorage = JSON.parse(userAuthStorage)
      dispatch(setUser(userStorage[0]))
    }

      let x = setInterval(() => {
        console.log(user)
        dispatch(actions.getFriends(user.id))
  
        dispatch(actions.getEvents(user.id))
      }, 5000)
  
  
      return () => {
        clearInterval(x)
      }
  
    
  }, [friends, events])


  const nav = useNavigate()
  const key = 'updatable';

  ws.onmessage = (msg: any) => {
    const message = JSON.parse(msg.data)


    console.log(message)
    if (message.chatId != activeChat) {

      if (message.audio.length > 1) {
        notification.open({
          key,
          message: `${message.user.name}`,
        description: `Audio message`,
        })
      } else {
        notification.open({
          key,
          message: `${message.user.name}`,
        description: `${message.text}`,
        onClick() {
          nav(`/chats/${message.chatId}`)
        },
        style: {
          cursor: "pointer"
        }
        })
      }
    } else {
      dispatch(pushMsgActiveChat(message))
    }
  }



    if (ws.readyState == 1) {
      const ID: Array<any> = []
      friends.forEach((el: any) => {
        ID.push(el.id + "")
      })

      events.forEach((el: any) => {
        ID.push(el.id + "event")
      })
        ws.send(JSON.stringify({
          type: "connection",
          id: ID,
        }))
    }



  useEffect(() => {
    let id: any = user.id
    dispatch(actions.getFriends(id))
    dispatch(actions.getEvents(id))
  }, [auth, user])





  return (
    <>
    <Modals/>
    <GlobalStyle handlerEvent={handlerEvent} createEventModalVisible={createEventModalVisible} eventModalVisible={eventModalVisible} visibleMonth={visibleMonth} visibleYear={visibleYear} modalAuth={modalAuth}/>
    <div className="App">
      <Wrapper>
      <Header/>
        <Content modalAuth = {modalAuth} visible = {visibleHeader} visibleMonth={visibleMonth} visibleYear={visibleYear} handlerEvent = {handlerEvent} createEventModalVisible = {createEventModalVisible} eventModalVisible = {eventModalVisible}> 
        {auth && <Routes>
            <Route path="/" element={<Event/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/friends" element={<Friends ws={ws}/>}/>
            <Route path="/chats" element={<Messages/>}/>
            <Route path="/chats/:id" element={<Chat  ws={ws}/>}/>
            <Route path="*" element={<h1>404</h1>}/>
          </Routes>}

          {!auth && <StyledH2 onClick={() => dispatch(setModalAuth())} style={{cursor: 'pointer'}}>?????????????? ?????? ??????????????????????????!</StyledH2>}
          {auth? 
                    <ExitButton onClick={() => {
                      dispatch(setLogout())
                  }}>    Exit
                  </ExitButton>
          :
          <ExitButton onClick={() => {
            dispatch(setModalAuth())
        }}>    Sign Up/In</ExitButton>
          }
        </Content>
      </Wrapper>
    </div>
    </>
  );
}






















































const Modals = React.memo(() => {
  const dispatch = useAppDispatch()

  const friends = useAppSelector(state => state.reducer.userReducer.friends)
  const visibleYear = useAppSelector(state => state.reducer.headerReducer.visibleYear)
  const visibleMonth = useAppSelector(state => state.reducer.headerReducer.visibleMonth)
  const year = useAppSelector(state => state.reducer.calendarReducer.year)
  const month = useAppSelector(state => state.reducer.calendarReducer.month)
  const yearRange = useAppSelector(state => state.reducer.calendarReducer.yearRange)
  const handlerEvent = useAppSelector(state => state.reducer.headerReducer.handlerEvent)
  const createEventModalVisible = useAppSelector(state => state.reducer.headerReducer.createEventModalVisible)
  const eventModalVisible = useAppSelector(state => state.reducer.headerReducer.eventModalVisible)
  const selectDay = useAppSelector(state => state.reducer.headerReducer.selectDay)
  const visibleHeader = useAppSelector(state => state.reducer.headerReducer.visible)
  const modalAuth = useAppSelector(state => state.reducer.headerReducer.modalAuth)
  const events = useAppSelector(state => state.reducer.headerReducer.events)
  const newEvent = useAppSelector(state => state.reducer.headerReducer.newEvent)
  const {nameError, descriptionError, timeEndError, timeStartError} = useAppSelector(state => state.reducer.headerReducer.newEvent)
  const invitesOnEvent = useAppSelector(state => state.reducer.headerReducer.newEvent.invites)
  const user = useAppSelector(state => state.reducer.userReducer.user)

  const [visibleFriends, setVisibleFriends] = React.useState<boolean>(false)



  const [nameBlur, setNameBlur] = React.useState<boolean>(false)
  const [descBlur, setDescBlur] = React.useState<boolean>(false)
  const [startBlur, setStartBlur] = React.useState<boolean>(false)
  const [endBlur, setEndBlur] = React.useState<boolean>(false)



  const nameReg : any= React.useRef()
  const loginReg: any = React.useRef()
  const passwordReg: any = React.useRef()
  const emailReg: any = React.useRef()


  const loginAuth: any  = React.useRef()
  const passwordAuth: any  = React.useRef()



  const [reg, setREG] = React.useState<boolean>(true)
  const nav = useNavigate() 



  return (
    <>
    {modalAuth && <BlockedZone style={modalAuth ?  {opacity: 1, zIndex: 100, cursor: "pointer"} : {opacity: 0, zIndex: -100}} onClick={() => dispatch(setModalAuth())}>
    <AddEventModal onClick={(e) => e.stopPropagation()}>
      {reg ? 
      <>
              <StyledH2>??????????????????????</StyledH2>
              <input type="text" ref={nameReg} placeholder='??????'/>
              <input type="text" ref={loginReg}  placeholder='??????????'/>
              <input type="text" ref={passwordReg} placeholder='????????????'/>
              <input type="text" ref={emailReg} placeholder='Email'/>
              <button style={{marginTop: "20px"}} onClick={() => {

                dispatch(actions.registration({
                  email: emailReg.current.value,
                  login: loginReg.current.value,
                  password: passwordReg.current.value,
                  name: nameReg.current.value,
                }))
              }}>????????????????????????????????????</button>
              <span onClick={() => setREG(!reg)} style={{marginTop: "20px", color: "#808080", cursor: "pointer"}}>?? ??????????????????????</span>
      </>
      :
      <>
      <StyledH2>??????????????????????</StyledH2>
      <input type="text" ref={loginAuth} placeholder='??????????'/>
      <input type="text"ref={passwordAuth}  placeholder='????????????'/>
      <button style={{marginTop: "20px"}}  onClick={() => {

dispatch(actions.login({
  login: loginAuth.current.value,
  password: passwordAuth.current.value
}))
}}>????????????????????????????</button>
      <span onClick={() => setREG(!reg)} style={{marginTop: "20px", color: "#808080", cursor: "pointer"}}>?? ??????????????????????</span>
      </>
      }
    </AddEventModal>
  </BlockedZone>}


  {visibleYear && <BlockedZone style={visibleYear ?  {opacity: 1, zIndex: 100, cursor: "pointer"} : {opacity: 0, zIndex: -100}} onClick={() => dispatch(setVisibleYear())}>
          <BlockedZoneSelect onClick={(e) => e.stopPropagation()} style={{cursor: "auto"}}>
            <div>
              <UpOutlined style={{cursor: "pointer", color: "#808080", transform: "rotate(-90deg)", marginTop: "8px"}} onClick={() => dispatch(decrementYear())}/>
              <StyledH3>{year}</StyledH3>
              <UpOutlined style={{cursor: "pointer", color: "#808080",  transform: "rotate(90deg)", marginTop: "8px"}} onClick={() => dispatch(incrementYear())}/>
            </div>
            <UpOutlined style={{margin: "0 auto", marginTop: "40px",  cursor: "pointer"}} onClick={() => dispatch(upRangeYear())}/>
            <FlexWrapperBlockedZone>
              {yearRange.map(el => <p style={year == el ? {color: '#a1a1a1'} : {}} onClick={() => dispatch(setYear(el))}>{el}</p>)}
            </FlexWrapperBlockedZone>
            <DownOutlined style={{ cursor: "pointer"}} onClick={() => dispatch(downRangeYear())}/>
          </BlockedZoneSelect>
        </BlockedZone>}



  {visibleMonth && <BlockedZone style={visibleMonth ?  {opacity: 1, zIndex: 100, cursor: "pointer"} : {opacity: 0, zIndex: -100}} onClick={() => dispatch(setVisibleMonth())}>
    <BlockedZoneSelect onClick={(e) => e.stopPropagation()} style={{cursor: "auto"}}>
      <div>
        <StyledH3>{month}</StyledH3>
      </div>
      <FlexWrapperBlockedZone>
        {months.map(el => <p onClick={() => dispatch(setMonth(el))} style={month == el ? {color: '#a1a1a1'} : {}}>{el}</p>)}
      </FlexWrapperBlockedZone>
    </BlockedZoneSelect>
  </BlockedZone>}




  {handlerEvent && <BlockedZone onClick={() => {

    dispatch(setHandler())}}>
      <BlockedZoneSelect onClick={(e) => e.stopPropagation()}>
        <FlexWrapperBlockedZone>
          <StyledH2>{selectDay}</StyledH2>
          <button onClick={() => dispatch(setCreateEventModalVisible())}>?????????????? ??????????????</button>
          <button onClick = {() => dispatch(setEventModalVisible())}>???????????????????? ??????????????</button>
        </FlexWrapperBlockedZone>
      </BlockedZoneSelect>
    </BlockedZone>}




  {createEventModalVisible && <BlockedZone onClick={() => {
    if (visibleFriends) {
      setVisibleFriends(false)
    }
    else {
      dispatch(setCreateEventModalVisible())
    }
  }}>
      <AddEventModal onClick={(e) => e.stopPropagation()}>
        <h3>?????????????????????????? ?????????????? ???? {selectDay}</h3>
        <input type="text" placeholder='????????????????' onBlur={() => setNameBlur(true)} onChange={(e) => dispatch(setNameNewEvent(e.target.value))}/>
        {(nameError && nameBlur) && <span>{nameError}</span>}
        <input type="text" placeholder='????????????????' onBlur={() => setDescBlur(true)} onChange={(e) => dispatch(setdDescriptionNewEvent(e.target.value))}/>
        {(descriptionError && descBlur) && <span>{descriptionError}</span>}
        <input type="text" placeholder='????????????' onBlur={() => setStartBlur(true)} onChange={(e) => dispatch(setStartNewEvent(e.target.value))}/>
        {(timeStartError && startBlur) && <span>{timeStartError}</span>}
        <input type="text" placeholder='??????????????????' onBlur={() => setEndBlur(true)} onChange={(e) => dispatch(setEndNewEvent(e.target.value))}/>
        {(timeEndError && endBlur) && <span>{timeEndError}</span>}
        <input type="color" value={newEvent.color} onChange={(e) => dispatch(setColorNewEvent(e.target.value))}/>
        <button onClick={() => {
          setVisibleFriends(prev => !prev)
        }}>???????????????? ????????????</button>



        <section>
          {invitesOnEvent.map((el,i) => <p key={el.id} style={{width: "100px"}}>{i+1}. {el.name}
            <span style={{cursor: "pointer"}} onClick={() => {
              dispatch(deleteInviteOnEvent(el.id))
            }}>??????????????</span>
          </p>
          )}
        </section>



        <button onClick={async () => {
          const obj:any = {...newEvent}
          obj.date = selectDay
          obj.ownerId = user.id
          obj.inviteUser = obj.invites
          await dispatch(actions.createEvent(obj))
          setNameBlur(false)
          setDescBlur(false)
          setEndBlur(false)
          setStartBlur(false)
          dispatch(setCreateEventModalVisible())
          setTimeout(() => {
             dispatch(actions.getFriends(user.id))
             dispatch(actions.getEvents(user.id))
          }, 800) 
        }}>?????????????? ??????????????</button>
      </AddEventModal>



      <AsideFriends style = {visibleFriends ? {transform: "translateX(0%)"} : {transform: "translateX(100%)"}} onClick={(e) => e.stopPropagation()}>
        <StyledH3 style={{marginBottom: "20px"}}>???????? ????????????</StyledH3>
        <ul>
          {friends.map((el: any) => {
            if (el.status == statusFriends.ACCEPT) {
             return <FriendsItem my={true} profile={el.friend} addEvent={true}/>
             }
          })}
        </ul>
      </AsideFriends>
    </BlockedZone>}


    {eventModalVisible && <BlockedZone onClick={() => dispatch(setEventModalVisible())}> 
    <EventsWrapper>
       {events.map((el: any) => {
        console.log(el)
        if (el.date == selectDay) {
          return  <AddEventModal onClick={(e) => e.stopPropagation()}>
          <h3>C???????????? ???? {selectDay} <br/> {el.timestart} - {el.timeend}</h3>
          <h3>{el.name}  <span style={{background: el.color, width: "12px", height: "12px", display: "inline-block", borderRadius: "50%"}}></span></h3>
          <p>{el.description}</p>
          <h3>??????????????????????</h3>
          <section>
            {el.invites.map((el: any) => {
              if (el.id !== user.id) {
               return <p>{el.name}</p>
              }
            })}
          </section>
          <button onClick={() => {
            dispatch(setEventModalVisible())
            nav(`/chats/${el.id}event`)
          }}>?? ??????!</button>
          {el.ownerId == user.id ?
          <button style={{background: "red", marginTop: "20px"}} 
          onClick={async () => {
            let check = window.confirm(`?????????????????????? ????????????????`)
            if (check) dispatch(actions.deleteEvent({eventId: el.id}))
            

            setTimeout(() => {
              dispatch(actions.getEvents(user.id))
            }, 800)
          
          }}>???????????????? ??????????????????????...</button>
          :
          <button style={{background: "red", marginTop: "20px"}}
          onClick={async () => {
            let check = window.confirm(`?????????????????????? ????????????????`)
            if (check) dispatch(actions.leaveEvent({eventId: el.id, userId: user.id}))

            setTimeout(() => {
              dispatch(actions.getEvents(user.id))
            }, 800)
          
          }}>????????????????????...</button>
          }
          </AddEventModal>
        }
       })}
         </EventsWrapper>
      </BlockedZone>}
      </>
  )
})

export default App;
