import { useAppDispatch, useAppSelector } from './store/store';
import { incrementYear, decrementYear, changeMonth, setYear, upRangeYear, downRangeYear, setMonth } from './store/calendar';
import Header from './comp/Header/Header';
import React from 'react';
import styled from 'styled-components';
import { HeaderProps } from './comp/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Event from './page/event/Event';
import { setVisibleMonth, setVisibleYear } from './store/header';
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
  height: 100vh;
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


const FlexWrapperBlockedZone = styled.div`
  width: 100%;
  padding: 10px 10px;
  height: 200px;
`



function App(): JSX.Element {

  const visibleYear = useAppSelector(state => state.reducer.headerReducer.visibleYear)
  const visibleMonth = useAppSelector(state => state.reducer.headerReducer.visibleMonth)
  const year = useAppSelector(state => state.reducer.calendarReducer.year)
  const month = useAppSelector(state => state.reducer.calendarReducer.month)
  const yearRange = useAppSelector(state => state.reducer.calendarReducer.yearRange)
  const dispatch = useAppDispatch()


  const visibleHeader = useAppSelector(state => state.reducer.headerReducer.visible)


  return (
    <BrowserRouter>
    <div className="App">
      <Wrapper>
        <Header/>
        <Content visible = {visibleHeader}>
          <Routes>
            <Route path="/" element={<Event/>}/>
            <Route path="/vvv" element={<h2>vvvvvvvvvvvvvvvvvvvvv</h2>}/>
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
      </Wrapper>
    </div>
    </BrowserRouter>
  );
}

export default App;
