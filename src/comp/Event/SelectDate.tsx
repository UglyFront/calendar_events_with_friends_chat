import styled from "styled-components"
import {UpOutlined, DownOutlined} from "@ant-design/icons"
import { useAppSelector, useAppDispatch} from "../../store/store"
import { changeMonth, decrementYear, incrementYear } from "../../store/calendar"
import { setVisibleMonth, setVisibleYear } from "../../store/eventWithModal"

const WrapperDate = styled.div`
    max-width: 320px;
    width: 100%;
    height: 70px;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    margin-left: -55px
`

const SelectMonth = styled.div`
   width: 170px;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   cursor: pointer;
`


const SelectYear = styled.div`
   width: 110px;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   cursor: pointer;
`


const StyledDate = styled.p`
    color: #817FEF;
    font-size: 28px;
    overflow: hidden;

`

const SelectDate: React.FC = () => {
    const year = useAppSelector(state => state.reducer.calendarReducer.year)
    const month = useAppSelector(state => state.reducer.calendarReducer.month)

    const dispatch = useAppDispatch()



    return (
        <WrapperDate>
            <SelectMonth>
                <UpOutlined style={{cursor: "pointer", height: 15, color: "#808080"}} onClick={() => dispatch(changeMonth({plus: true}))}/>
                <StyledDate  onClick={() => dispatch(setVisibleMonth())}>{month}</StyledDate>
                <DownOutlined style={{cursor: "pointer", height: 15, color: "#808080"}} onClick={() => dispatch(changeMonth({plus: false}))}/>
            </SelectMonth>

            <SelectYear>
                <UpOutlined style={{cursor: "pointer", height: 15, color: "#808080"}} onClick={() => dispatch(incrementYear())}/>
                <StyledDate onClick={() => dispatch(setVisibleYear())}>{year}</StyledDate>
                <DownOutlined style={{cursor: "pointer", height: 15, color: "#808080"}} onClick={() => dispatch(decrementYear())}/> 
            </SelectYear>
        </WrapperDate>
    )
}

export default SelectDate
