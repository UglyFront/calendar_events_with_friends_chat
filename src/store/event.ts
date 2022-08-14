import { createSlice } from "@reduxjs/toolkit";
import { IEventState } from "../types/header";


const state: IEventState = {
    events: []
}


export const eventSlice = createSlice({
    name: "event",
    initialState: state,
    reducers: {

    }
})


export default eventSlice.reducer;
export const {} = eventSlice.actions