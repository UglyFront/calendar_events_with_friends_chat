import { createSlice } from "@reduxjs/toolkit";

interface HeaderState {
    visible: boolean,
    visibleYear: boolean,
    visibleMonth: boolean
}

const state: HeaderState = {
    visible: true,
    visibleYear: false,
    visibleMonth: false
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
        }
    }
})


export const {setVisible, setVisibleYear, setVisibleMonth} = headerSlice.actions
export default headerSlice.reducer