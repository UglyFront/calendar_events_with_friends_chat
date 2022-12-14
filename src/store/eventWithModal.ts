import { createSlice } from "@reduxjs/toolkit";
import { HeaderState, IEvent, UserOther } from "../types/eventWithModals";
import { PayloadAction } from "@reduxjs/toolkit";



const randColor = (): string => {
    let color: string = "#"
    for(let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 9)
    }
    return color
}


const state: HeaderState = {
    visible: false,
    visibleYear: false,
    visibleMonth: false,
    createEventModalVisible: false,
    eventModalVisible: false,
    handlerEvent: false,
    selectDay: "",
    events: [],
    newEvent: {
        date: "",
        color: randColor(),
        invites: [],
        name: "",
        description: "",
        timestart: "",
        timeend: "",
        nameError: "",
        descriptionError: "",
        timeEndError: "",
        timeStartError: "",
        ownerId: 0
    },

    modalAuth: false
}


export const headerSlice = createSlice({
    name: "header",
    initialState: state,
    reducers: {
        setModalAuth(state): void {
            state.modalAuth = !state.modalAuth
        },
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
            if (action.payload.length < 3) {
                state.newEvent.nameError = "???????????? 3?? ????????????????"
            }
            else {
                state.newEvent.nameError = ""
            }
            state.newEvent.name = action.payload
            console.log(state.newEvent.name)
        },

        setdDescriptionNewEvent(state, action:PayloadAction<string>): void  {
            if (action.payload.length < 3) {
                state.newEvent.descriptionError = "???????????? 3?? ????????????????"
            }
            else {
                state.newEvent.descriptionError = ""
            }
            state.newEvent.description = action.payload
            console.log(state.newEvent.description)
        },

        setStartNewEvent(state, action:PayloadAction<string>): void  {
            if (action.payload.length < 3) {
                state.newEvent.timeStartError = "???????????? 3?? ????????????????"
            }
            else {
                state.newEvent.timeStartError = ""
            }
            state.newEvent.timestart = action.payload
            console.log(state.newEvent.timestart)
        },

        setEndNewEvent(state, action:PayloadAction<string>): void  {
            if (action.payload.length < 3) {
                state.newEvent.timeEndError = "???????????? 3?? ????????????????"
            }
            else {
                state.newEvent.timeEndError = ""
            }
            state.newEvent.timeend = action.payload
            console.log(state.newEvent.timeend)
        },

        clearEvent(state): void  {
               state.newEvent = {
                date: "",
                color: randColor(),
                invites: [],
                name: "",
                description: "",
                timestart: "",
                timeend: "",
                nameError: "",
                descriptionError: "",
                timeEndError: "",
                timeStartError: "",
                ownerId: 0
            }
        },


        addInvitesOnEvent(state, action: PayloadAction<UserOther>) {
            let uniq = true

            state.newEvent.invites.forEach(el => {
                if (el.id == action.payload.id) {
                    uniq = false
                }
            })

            if (uniq) {
                state.newEvent.invites.push(action.payload)
            } else {
                alert(`?????? ?? ????????????`)
            }
        },


        setEvents(state, action: PayloadAction<IEvent[]>) {
            state.events = action.payload
        },


        deleteInviteOnEvent(state, action: PayloadAction<number>) {
           state.newEvent.invites = state.newEvent.invites.filter(el => el.id !== action.payload)
        }

    }
})


export const {deleteInviteOnEvent, clearEvent, addInvitesOnEvent, setEvents, setModalAuth, setVisible, setVisibleYear, setVisibleMonth, setCurrentDay, setEventModalVisible, setCreateEventModalVisible, setHandler, setColorNewEvent, setNameNewEvent, setdDescriptionNewEvent, setStartNewEvent, setEndNewEvent } = headerSlice.actions
export default headerSlice.reducer