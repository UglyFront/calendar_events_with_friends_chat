import { useAppDispatch, useAppSelector } from './store/store';
import { incrementYear, decrementYear, changeMonth, setYear, upRangeYear, downRangeYear, setMonth } from './store/calendar';
import Header from './comp/Header/Header';
import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Event from './page/event/Event';
import { setEventModalVisible, setVisibleMonth, setVisibleYear } from './store/header';
import {UpOutlined, DownOutlined} from "@ant-design/icons"
import { months } from './model/calendar';


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


const BlockedZone = styled.div`
  position: fixed,
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background: rgba(0,0,0,0.7);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -90px;
  transition: .3s
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


const AddEventModal = styled.div`
  width: 300px;
  height: 500px;
  background: #fff;
  padding: 10px 10px;

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
    height: 30px;
    margin-top: 10px;
    outline: none;
    border: none;
    border-bottom: 1px solid #a1a1a1;
  }

  span {
    display: block;
    color: red;
    margin-bottom: 15px;
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
`


const AsideFriends = styled.aside`
  width: 300px;
  height: 100vh;
  background: #fff;
  position: fixed;
  right: 0;
  transition: .3s
`


function App(): JSX.Element {
  const dispatch = useAppDispatch()

  const visibleYear = useAppSelector(state => state.reducer.headerReducer.visibleYear)
  const visibleMonth = useAppSelector(state => state.reducer.headerReducer.visibleMonth)
  const year = useAppSelector(state => state.reducer.calendarReducer.year)
  const month = useAppSelector(state => state.reducer.calendarReducer.month)
  const yearRange = useAppSelector(state => state.reducer.calendarReducer.yearRange)
  const eventModalVisible = useAppSelector(state => state.reducer.headerReducer.eventModalVisible)
  const selectDay = useAppSelector(state => state.reducer.headerReducer.selectDay)
  const visibleHeader = useAppSelector(state => state.reducer.headerReducer.visible)

  const [visibleFriends, setVisibleFriends] = React.useState<boolean>(false)


  return (
    <BrowserRouter>
    <div className="App">
      <Wrapper>
        <Header/>
        <Content visible = {visibleHeader}>
          <Routes>
            <Route path="/" element={<Event/>}/>
            <Route path="/home" element={<h2>home page</h2>}/>
            <Route path="/friends" element={<h2>friends page</h2>}/>
            <Route path="/chats" element={<h2>message page</h2>}/>
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

        {eventModalVisible && <BlockedZone onClick={() => {
          if (visibleFriends) {
            setVisibleFriends(false)
          }
          else {
            dispatch(setEventModalVisible())
          }
        }}>
            <AddEventModal onClick={(e) => e.stopPropagation()}>
              <h3>Запланировать событие на {selectDay}</h3>
              <input type="text" placeholder='Название'/>
              <input type="text" placeholder='Описание'/>
              <input type="text" placeholder='Начало'/>
              <input type="text" placeholder='Окончание'/>
              <span>Error zone</span>
              <button onClick={() => {
                setVisibleFriends(prev => !prev)
              }}>Добавить друзей</button>
              {/* тригерит правый сайдбар с френдсами*/}
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
              <button>Создать событие</button>
            </AddEventModal>



            <AsideFriends style = {visibleFriends ? {transform: "translateX(0%)"} : {transform: "translateX(100%)"}} onClick={(e) => e.stopPropagation()}>
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
            </AsideFriends>
          </BlockedZone>}
      </Wrapper>
    </div>
    </BrowserRouter>
  );
}

export default App;
