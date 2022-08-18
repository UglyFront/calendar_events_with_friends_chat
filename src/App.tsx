import { useAppDispatch, useAppSelector } from './store/store';
import { incrementYear, decrementYear, changeMonth, setYear, upRangeYear, downRangeYear, setMonth } from './store/calendar';
import Header from './comp/Header/Header';
import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Event from './page/event/Event';
import {addEvent, setEventModalVisible, setVisibleMonth, setVisibleYear, setHandler, setCreateEventModalVisible, setColorNewEvent, setNameNewEvent, setdDescriptionNewEvent, setStartNewEvent, setEndNewEvent } from './store/eventWithModal';
import {UpOutlined, DownOutlined} from "@ant-design/icons"
import { months } from './model/calendar';
import { IEvent } from './types/eventWithModals';
import Home from './page/home/Home';
import Friends from './page/friends/Friends';
import Messages from './page/messages/Messages';
import FriendsItem from './comp/Friends/FriendsItem';


export interface IStyledHeader {
  visible: boolean
}



const Wrapper = styled.div`
  display: flex;
`


const Content = styled.div<IStyledHeader>`
  max-width: ${({visible}) => visible ? "100vw" : "calc(100vw - 90px)"};
  width: 100%;
  position: absolute;
  left: ${({visible}) => visible ? "90px" : "0px"};
  transition: .3s;
  min-height: calc(100vh - 20px);
  padding: 20px 30px 0px 60px;
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
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -90px;
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
`



function App(): JSX.Element {
  console.log("globsal RERENDER")
  const dispatch = useAppDispatch()

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
  const events = useAppSelector(state => state.reducer.headerReducer.events)
  const newEvent = useAppSelector(state => state.reducer.headerReducer.newEvent)
  const {nameError, descriptionError, timeEndError, timeStartError} = useAppSelector(state => state.reducer.headerReducer.newEvent)

  const [visibleFriends, setVisibleFriends] = React.useState<boolean>(false)



  const [nameBlur, setNameBlur] = React.useState<boolean>(false)
  const [descBlur, setDescBlur] = React.useState<boolean>(false)
  const [startBlur, setStartBlur] = React.useState<boolean>(false)
  const [endBlur, setEndBlur] = React.useState<boolean>(false)


  return (
    <BrowserRouter>
    <div className="App">
      <Wrapper>
        <Header/>
        <Content visible = {visibleHeader}>
          <Routes>
            <Route path="/" element={<Event/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/friends" element={<Friends/>}/>
            <Route path="/chats" element={<Messages/>}/>
            <Route path="/chats/:id" element={<h1>чат с ид</h1>}/>
            <Route path="*" element={<h1>404</h1>}/>
          </Routes>
          <ExitButton>
            Sign Up
          </ExitButton>
        </Content>




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




        {handlerEvent && <BlockedZone onClick={() => dispatch(setHandler())}>
            <BlockedZoneSelect onClick={(e) => e.stopPropagation()}>
              <FlexWrapperBlockedZone>
                <StyledH2>{selectDay}</StyledH2>
                <button onClick={() => dispatch(setCreateEventModalVisible())}>Создать событие</button>
                <button onClick = {() => dispatch(setEventModalVisible())}>Посмотреть события</button>
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
              <h3>Запланировать событие на {selectDay}</h3>
              <input type="text" placeholder='Название' onBlur={() => setNameBlur(true)} onChange={(e) => dispatch(setNameNewEvent(e.target.value))}/>
              {(nameError && nameBlur) && <span>{nameError}</span>}
              <input type="text" placeholder='Описание' onBlur={() => setDescBlur(true)} onChange={(e) => dispatch(setdDescriptionNewEvent(e.target.value))}/>
              {(descriptionError && descBlur) && <span>{descriptionError}</span>}
              <input type="text" placeholder='Начало' onBlur={() => setStartBlur(true)} onChange={(e) => dispatch(setStartNewEvent(e.target.value))}/>
              {(timeStartError && startBlur) && <span>{timeStartError}</span>}
              <input type="text" placeholder='Окончание' onBlur={() => setEndBlur(true)} onChange={(e) => dispatch(setEndNewEvent(e.target.value))}/>
              {(timeEndError && endBlur) && <span>{timeEndError}</span>}
              <input type="color" value={newEvent.color} onChange={(e) => dispatch(setColorNewEvent(e.target.value))}/>
              <button onClick={() => {
                setVisibleFriends(prev => !prev)
              }}>Добавить друзей</button>



              <section>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
                <p>1 друг</p>
              </section>



              <button onClick={() => {
                dispatch(addEvent())
                setNameBlur(false)
                setDescBlur(false)
                setEndBlur(false)
                setStartBlur(false) // исправить сет фалс
              }}>Создать событие</button>
            </AddEventModal>



            <AsideFriends style = {visibleFriends ? {transform: "translateX(0%)"} : {transform: "translateX(100%)"}} onClick={(e) => e.stopPropagation()}>
              <StyledH3 style={{marginBottom: "20px"}}>Ваши друзья</StyledH3>
              <ul>
                <FriendsItem my={true}/>
                <FriendsItem my={true}/>
                <FriendsItem my={true}/>
                <FriendsItem my={true}/>
                <FriendsItem my={true}/>
                <FriendsItem my={true}/>
                <FriendsItem my={true}/>
              </ul>
            </AsideFriends>
          </BlockedZone>}


          {eventModalVisible && <BlockedZone onClick={() => dispatch(setEventModalVisible())}> 
          <EventsWrapper>
             {events.map((el: IEvent) => {
              if (el.date == selectDay) {
                return  <AddEventModal onClick={(e) => e.stopPropagation()}>
                <h3>Cобытие на {selectDay} <br/> {el.timeStart} - {el.timeEnd}</h3>
                <h3>{el.name}  <span style={{background: el.color, width: "12px", height: "12px", display: "inline-block", borderRadius: "50%"}}></span></h3>
                <p>{el.description}</p>
                <h3>Приглашеные</h3>
                <section>
                  {el.invites.map(id => <p>{id}</p>)}
                </section>
                <button>В чат!</button>
                <button style={{background: "red", marginTop: "20px"}}>Отказаться...</button>
                </AddEventModal>
              }
             })}
               </EventsWrapper>
            </BlockedZone>}

      </Wrapper>
    </div>
    </BrowserRouter>
  );
}

export default App;
