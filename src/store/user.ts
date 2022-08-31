import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserOther } from "../types/eventWithModals";
import { Friends, IUserState, User } from "../types/user";





const initialState: IUserState = {
    auth: false,
    user: {
        email: null,
        img: null,
        name: null,
        status: null,
        statusText: null,
        id: 0
    },
    friends: [],
    searchUser: [],
    filterFriends: []
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action:PayloadAction<User>): void {
            state.user = action.payload
            state.auth = true
        },


        setFriends(state, action:PayloadAction<Array<any>>) {
            state.friends = action.payload
        },


        setLogout(state): void {
            state.auth = false;
            state.user = {  
                email: null,
                img: null,
                name: null,
                status: null,
                statusText: null,
                id: 0
            }
            window.localStorage.removeItem("userAuth")
        },

        setSearch(state, action: PayloadAction<Array<Friends>>) {
            state.filterFriends = []
            state.searchUser = action.payload
        },

        filterFreinds(state, action: PayloadAction<string>) {
            state.filterFriends.forEach(el => {
                if (el.name?.includes(action.payload)) {
                    state.filterFriends.push(el)
                }
            })

            console.log(state.filterFriends.length)
        }
    }
})



export const {filterFreinds, setSearch, setUser, setLogout, setFriends} =  userSlice.actions
export default userSlice.reducer