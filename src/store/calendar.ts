import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { months } from "../model/calendar";
import { createCalendar } from "../model/calendar";
import { IChangeMonth, ICalendarState } from "../types/calendar";
import { setVisibleMonth } from "./header";

const date = new Date().toString();
const yearNow: number =  +date.split(" ")[3]
const monthNow: string = date.split(" ")[1]



function rangeYear(year: number): number[] {
  const rangeYear = [];

  for (let i = year - 10; i < year + 10; i++) {
    rangeYear.push(i)
  }

  return rangeYear
}



const state: ICalendarState = {
        year: yearNow,
        month: monthNow,
        yearRange: rangeYear(yearNow),
        calendar: createCalendar(monthNow, yearNow)
}


export const calendarSlice = createSlice({
    name: "calendar",
    initialState: state,
    reducers: {
        incrementYear: (state): void => {
                state.year += 1
                state.yearRange = rangeYear(state.year)
                state.calendar = createCalendar(state.month, state.year)
        },

        decrementYear: (state): void => {
                state.year -= 1
                state.yearRange = rangeYear(state.year)
                state.calendar = createCalendar(state.month, state.year)

        },
        upRangeYear(state): void {
          let minYearInRange = state.yearRange[0]
          state.yearRange = rangeYear(minYearInRange)
        },
        downRangeYear(state): void {
          let maxYearInRange = state.yearRange[state.yearRange.length - 1]
          state.yearRange = rangeYear(maxYearInRange)
        },
        setYear(state, action: PayloadAction<number>): void {
            state.year = action.payload
            state.calendar = createCalendar(state.month, state.year)
        },
        changeMonth(state, action: PayloadAction<IChangeMonth>): void {
            let idx = months.indexOf(state.month)

            if (action.payload.plus) {
                if (idx + 1 === months.length) {
                    state.month = months[0]
                    state.year += 1
                    state.calendar = createCalendar(state.month, state.year)
                  } 
            
                  else {
                    state.month = months[idx+1]
                    state.calendar = createCalendar(state.month, state.year)
                  }
            }
            else {
                if (idx === 0) {
                    state.month = months[months.length - 1]
                    state.year -= 1
                    state.calendar = createCalendar(state.month, state.year)
                  } 
            
                  else {
                    state.month = months[idx-1]
                    state.calendar = createCalendar(state.month, state.year)
                  }
            }
        },

        setMonth(state, action:PayloadAction<string>): void {
          state.month = action.payload
          state.calendar = createCalendar(state.month, state.year)
        }
    }
})


export const { incrementYear, decrementYear, changeMonth, setYear, upRangeYear, downRangeYear, setMonth } = calendarSlice .actions
export default calendarSlice.reducer