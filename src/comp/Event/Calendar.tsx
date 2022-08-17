import styled from "styled-components"
import { biggestDayNow } from "../../helpers/biggestDay"
import { dayOfTheWeek } from "../../model/calendar"
import { setCurrentDay } from "../../store/eventWithModal"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { Calendar } from "../../types/calendar"
import { IEvent } from "../../types/eventWithModals"


//width 120% on phone nice look! margin-left: -40px;
const Grid = styled.div`
max-width: 1200px
;
width: 100%; 
height: 100%;
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
  grid-template-rows: 1fr 1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    ". . . . . . ."; 

    div {
        height: 100px;
        border: 1px solid #5790FF;
        font-size: 22px;

        .events {
            width: 100%;
            height: 70px;
            display: flex;
            border: none;
            flex-wrap: wrap;

            .event {
                width: 15px;
                height: 15px;
                display: block;
                border: none;
                margin-right: 5px;
                border-radius: 100%
            }
        }
    }


    .notCurrentMonth {
        color: #a1a1a1;
        border: 1px solid #a1a1a1;
    }

    .today {
        border: 1px solid #CBCAFF;
        background: #CBCAFF
    }

    p {
        display: flex;
        align-items: flex-end;
        font-size: 20px;
        font-weight: 500;
    }
`


const CalendarEvent: React.FC = () => {
    const dispatch = useAppDispatch()
    const calendar = useAppSelector(state => state.reducer.calendarReducer.calendar)
    const month = useAppSelector(state => state.reducer.calendarReducer.month)
    const events = useAppSelector(state => state.reducer.headerReducer.events)


    return (
       <Grid>
        {dayOfTheWeek.map((dayWeek: string) => <p>{dayWeek}</p>)}

        {calendar.map((el: Calendar): JSX.Element => {
            let elArr: string[] = el!.date.split("/"); // 10/Aug/2022
            let numEl: number = +elArr![0]
            let monthEl: string = elArr![1]
            let yearEl: number = +elArr![2]


            let today: string[] = new Date().toString().split(" ");
            let dayToday: number = +today[2];
            let monthToday: string = today[1];
            let yearToday: number = +today[3];

            if(monthEl == month) {
                if (monthEl == monthToday && dayToday === numEl && yearEl === yearToday) {
                    return <div className="today" onClick={() => {
                        const real: boolean =  biggestDayNow([numEl, monthEl, yearEl]);
                        if (real) {
                            dispatch(setCurrentDay(el.date))
                        }
                    }}>{numEl} <small>{monthEl}</small>
                             <div className="events">
                    {events.map((event: IEvent) => {
                            if(event.date == el.date) {
                                return <div className="event" style={{background: event.color}}></div>
                            }
                        })}
                    </div>
                    </div>
                }
                return <div onClick={() => {
                    const real: boolean =  biggestDayNow([numEl, monthEl, yearEl]);
                    if (real) {
                        dispatch(setCurrentDay(el.date))
                    }
                }}>{numEl} <small>{monthEl}</small>
                            <div className="events">
                    {events.map((event: IEvent) => {
                            if(event.date == el.date) {
                                return <div className="event" style={{background: event.color}}></div>
                            }
                        })}
                    </div>
                </div>
            }
            else {
                return <div className="notCurrentMonth" onClick={() => {
                    const real: boolean =  biggestDayNow([numEl, monthEl, yearEl]);
                    if (real) {
                        dispatch(setCurrentDay(el.date))
                    }
                }}>{numEl} <small>{monthEl}</small>
                    <div className="events">
                    {events.map((event: IEvent) => {
                            if(event.date == el.date) {
                                return <div className="event" style={{background: event.color}}></div>
                            }
                        })}
                    </div>
                </div>
            }
        })}
       </Grid>
    )
}


export default CalendarEvent