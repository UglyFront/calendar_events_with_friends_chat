export enum statusEnum {
    ONLINE = "Online",
    OFFLINE = "Offline"
}

export interface User {
    id: number,
    name: string | null,
    email: string | null,
    img: string | null,
    statusText: string | null,
    status: statusEnum | null,
}

export type Friends = Omit<User, "email">

export interface IUserState {
    auth: boolean,
    user: User,
    friends: any,
    searchUser: Array<Friends>,
    filterFriends: Array<Friends>,
    activeChat: string,
    msgActiveChat: Array<any>
}

export enum statusFriends {
    CLOSE = "CLOSE",
    SEND = "SEND",
    ACCEPT = "ACCEPT"
}