import { createSlice } from "@reduxjs/toolkit";
import { HeaderState, IEvent } from "../types/eventWithModals";
import { PayloadAction } from "@reduxjs/toolkit";
import { matchRoutes } from "react-router-dom";
import SelectDate from "../comp/Event/SelectDate";



const randColor = (): string => {
    let color: string = "#"
    for(let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 9)
    }
    return color
}


const state: HeaderState = {
    visible: true,
    visibleYear: false,
    visibleMonth: false,
    createEventModalVisible: false,
    eventModalVisible: false,
    handlerEvent: false,
    selectDay: "",
    events: [
    {
        date: "18/Aug/2022",
        color: "red",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "yellow",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "blue",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "cyan",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "cyan",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "cyan",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "cyan",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "cyan",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "cyan",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "cyan",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "cyan",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "cyan",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },

    {
        date: "20/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "cyan",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "cyan",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "cyan",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "20/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "23/Aug/2022",
        color: "red",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "23/Aug/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    {
        date: "23/Sep/2022",
        color: "green",
        invites: [2,5,9,3],
        name: "Блядки",
        description: "опаоаоваовоавоаовоава",
        timeStart: "12:00",
        timeEnd: "14:00",
    },
    ],
    newEvent: {
        date: "",
        color: randColor(),
        invites: [],
        name: "",
        description: "",
        timeStart: "",
        timeEnd: "",
        nameError: "",
        descriptionError: "",
        timeEndError: "",
        timeStartError: ""
    }
}


export const headerSlice = createSlice({
    name: "header",
    initialState: state,
    reducers: {
        setVisible(state): void {
            state.visible = !state.visible
        },
        setVisibleYear(state): void  {
            state.visible = false
            state.visibleYear = !state.visibleYear
        },
        setVisibleMonth(state): void  {
            state.visible = false
            state.visibleMonth = !state.visibleMonth
        },
        setCurrentDay(state, action: PayloadAction<string>): void {
            state.selectDay = action.payload;
            state.visible = false


            let hasEvent = false
            state.events.find((event: IEvent) => {
                if (state.selectDay === event.date) {
                    hasEvent = true;
                }
            })


            if(hasEvent) {
                state.handlerEvent = true 
            }
            else {
                state.createEventModalVisible = true
            }
        },
        setHandler(state): void {
            state.handlerEvent = !state.handlerEvent
        },
        setEventModalVisible(state): void {
            state.handlerEvent = false
            state.visible = false
            state.eventModalVisible = !state.eventModalVisible
        },
        setCreateEventModalVisible(state): void {
            state.handlerEvent = false
            state.visible = false
            state.createEventModalVisible = !state.createEventModalVisible
        },


        setColorNewEvent(state, action:PayloadAction<string>): void  {
            state.newEvent.color = action.payload
            console.log(state.newEvent.color)
        },

        setNameNewEvent(state, action:PayloadAction<string>): void  {
            if (state.newEvent.name.length < 3) {
                state.newEvent.nameError = "Больше 3х символов"
            }
            else {
                state.newEvent.nameError = ""
            }
            state.newEvent.name = action.payload
            console.log(state.newEvent.name)
        },

        setdDescriptionNewEvent(state, action:PayloadAction<string>): void  {
            if (state.newEvent.description.length < 3) {
                state.newEvent.descriptionError = "Больше 3х символов"
            }
            else {
                state.newEvent.descriptionError = ""
            }
            state.newEvent.description = action.payload
            console.log(state.newEvent.description)
        },

        setStartNewEvent(state, action:PayloadAction<string>): void  {
            if (state.newEvent.timeStart.length < 3) {
                state.newEvent.timeStartError = "Больше 3х символов"
            }
            else {
                state.newEvent.timeStartError = ""
            }
            state.newEvent.timeStart = action.payload
            console.log(state.newEvent.timeStart)
        },

        setEndNewEvent(state, action:PayloadAction<string>): void  {
            if (state.newEvent.timeEnd.length < 3) {
                state.newEvent.timeEndError = "Больше 3х символов"
            }
            else {
                state.newEvent.timeEndError = ""
            }
            state.newEvent.timeEnd = action.payload
            console.log(state.newEvent.timeEnd)
        },

        addEvent(state): void  {
            if ((state.newEvent.nameError && state.newEvent.descriptionError && state.newEvent.timeStartError && state.newEvent.timeEndError) === "" && (state.newEvent.name.length > 3 && state.newEvent.description.length > 3 && state.newEvent.timeStart.length > 3  && state.newEvent.timeEnd.length > 3)) {
                state.events.push({
                color: state.newEvent.color,
                date: state.selectDay,
                description: state.newEvent.description,
                invites: [],
                name: state.newEvent.name,
                timeEnd: state.newEvent.timeEnd,
                timeStart: state.newEvent.timeStart
               })




               state.newEvent = {
                date: "",
                color: randColor(),
                invites: [],
                name: "",
                description: "",
                timeStart: "",
                timeEnd: "",
                nameError: "",
                descriptionError: "",
                timeEndError: "",
                timeStartError: ""
            }
            }
            else {
                alert("error form")
            }
        }

    }
})


export const {setVisible, setVisibleYear, setVisibleMonth, setCurrentDay, setEventModalVisible, setCreateEventModalVisible, setHandler, setColorNewEvent, setNameNewEvent, setdDescriptionNewEvent, setStartNewEvent, setEndNewEvent, addEvent } = headerSlice.actions
export default headerSlice.reducer