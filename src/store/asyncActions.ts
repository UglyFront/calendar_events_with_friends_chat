import { clearEvent, setEvents, setModalAuth } from "./eventWithModal"
import { AppDispatch } from "./store"
import { setFriends, setMessageActiveChat, setSearch, setUser } from "./user"

export const URL = "http://localhost:6600"



interface IRegBody {
    name: string,
    login: string,
    password: string,
    email: string
}


type ILogBody = Omit<IRegBody, "name" | "email">

class asyncActions {
    registration(body: IRegBody) {
        return async (dispatch: AppDispatch) => {
            fetch(`${URL}/auth/registration`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode == 400) {
                    alert(data.message)
                } else if (data.statusCode == 404) {
                    alert("Ошибка запроса...")
                } else {
                    console.log(data)
                    window.localStorage.setItem("userAuth", JSON.stringify([data]))
                    dispatch(setUser(data))
                    dispatch(setModalAuth())
                }
            })
        }
    }


    login(body: ILogBody) {
        return (dispatch: AppDispatch) => {
            fetch(`${URL}/auth/login`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode == 400) {
                    alert(data.message)
                } else if (data.statusCode == 404) {
                    alert("Ошибка запроса...")
                } else {
                    window.localStorage.setItem("userAuth", JSON.stringify(data))
                    dispatch(setUser(data[0]))
                    dispatch(setModalAuth())
                }
            })
        }
    }


    getFriends(id: string | number) {
        return (dispatch: AppDispatch) => {
            fetch(`${URL}/friends/${id}`)
            .then(res => res.json())
            .then(data => {dispatch(setFriends(data))
                console.log(data)
            })

        }
    }

    getEvents(id: string | number) {
        return (dispatch: AppDispatch) => {
            fetch(`${URL}/event/${id}`)
            .then(res => res.json())
            .then(data => {
                dispatch(setEvents(data))
            })

        }
    }



    createEvent(body: any) {
        console.log(body)
        return (dispatch: AppDispatch) => {
            if ((body.nameError && body.descriptionError && body.timeStartError && body.timeEndError) === "" && (body.name.length > 3 && body.description.length > 3 && body.timestart.length > 3  && body.timeend.length > 3)) {
            fetch(`${URL}/event`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            dispatch(clearEvent())
            }
            else {
                alert(`error form`)
            }
        }
    }


    searchFriends(value: string) {
        return (dispatch: AppDispatch) => {
            fetch(`${URL}/friends/?s=${value}`)
            .then(res => res.json())
            .then(data => {
                dispatch(setSearch(data))
            })

        }
    }



    createFriend(body: any) {
        return (dispatch: AppDispatch) => {
            fetch(`${URL}/friends`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    }



    deleteFriend(body: any) {
        return (dispatch: AppDispatch) => {
            fetch(`${URL}/friends/delete`, {
                method: "DELETE",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    }


    acceptFriends(body: any) {
        return (dispatch: AppDispatch) => {
            fetch(`${URL}/friends/accept`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    }


    leaveEvent(body: any) {
        return (dispatch: AppDispatch) => {
            fetch(`${URL}/event/leave`, {
                method: "DELETE",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    }



    deleteEvent(body: any) {
        return (dispatch: AppDispatch) => {
            fetch(`${URL}/event`, {
                method: "DELETE",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    }



    getMessageChat(id: string) {
        return (dispatch: AppDispatch) => {
        fetch(`${URL}/msg/${id}`)
        .then(res => res.json())
        .then(data => {
            dispatch(setMessageActiveChat(data))
        })
        }
    }
}


export const actions = new asyncActions()