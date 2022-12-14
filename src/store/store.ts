import { configureStore, combineReducers } from '@reduxjs/toolkit'
import  calendarSlice  from './calendar'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import  headerSlice  from './eventWithModal'
import userSlice from "./user"



const rootReducer = combineReducers({
    calendarReducer: calendarSlice,
    headerReducer: headerSlice,
    userReducer: userSlice
})


export const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector