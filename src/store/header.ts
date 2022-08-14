import { createSlice } from "@reduxjs/toolkit";
import { HeaderState } from "../types/header";
import { PayloadAction } from "@reduxjs/toolkit";


const state: HeaderState = {
    visible: true,
    visibleYear: false,
    visibleMonth: false,
    eventModalVisible: false,
    selectDay: ""
}

export const headerSlice = createSlice({
    name: "header",
    initialState: state,
    reducers: {
        setVisible(state) {
            state.visible = !state.visible
        },
        setVisibleYear(state) {
            state.visible = false
            state.visibleYear = !state.visibleYear
        },
        setVisibleMonth(state) {
            state.visible = false
            state.visibleMonth = !state.visibleMonth
        },
        setCurrentDay(state, action: PayloadAction<string>): void {
            state.selectDay = action.payload;
            state.visible = false
            state.eventModalVisible = true
        },
        setEventModalVisible(state) {
            state.eventModalVisible = !state.eventModalVisible
        }
    }
})


export const {setVisible, setVisibleYear, setVisibleMonth, setCurrentDay, setEventModalVisible} = headerSlice.actions
export default headerSlice.reducer