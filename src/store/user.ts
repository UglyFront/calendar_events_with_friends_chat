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
    filterFriends: [],
    activeChat: "",
    msgActiveChat: [
      
    ]
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
            state.searchUser = []
            state.friends.forEach((el: any) => {
                console.log(el.name)
                if (el.friend?.name?.includes(action.payload) && el.status == "ACCEPT") {
                    state.filterFriends.push(el)
                }
            })

            console.log(state.filterFriends.length)
        },


        setActiveChat(state, action:PayloadAction<string>) {
            state.activeChat = action.payload
        },

        setMessageActiveChat(state, action:PayloadAction<Array<any>>) {
            state.msgActiveChat = action.payload
        },


        pushMsgActiveChat(state, action:PayloadAction<any>) {
            state.msgActiveChat.push(action.payload)
            console.log(action.payload)
        },

        updateImg(state, action:PayloadAction<string>) {
            state.user.img = action.payload
        }
    }
})



export const {updateImg, setMessageActiveChat, pushMsgActiveChat, setActiveChat, filterFreinds, setSearch, setUser, setLogout, setFriends} =  userSlice.actions
export default userSlice.reducer