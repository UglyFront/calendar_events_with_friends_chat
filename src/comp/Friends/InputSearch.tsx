import styled from "styled-components"
import {useState} from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { actions } from "../../store/asyncActions"
import { filterFreinds, setSearch } from "../../store/user"



interface IInputSearch {
    global?: boolean
}



export const Input = styled.input<IInputSearch>`
    width: 150px;
    height: 20px;
    border: 0px;
    border-bottom: 1px solid #a1a1a1;
    outline: none
`

const InputSearch: React.FC<IInputSearch> = (props) => {

    const [value, setValue] = useState<string>("")
    const dispatch = useAppDispatch()
    const {searchUser, friends} = useAppSelector(state => state.reducer.userReducer)

    return (
        <Input value={value} 
        placeholder={props.global ? "Найти нового друга" : "Поиск среди друзей"} 
        onChange={(e) => {
            setValue(e.target.value)

            if (props.global) {
                if (e.target.value.trim()) {
                    dispatch(actions.searchFriends(e.target.value))
                } else {
                    dispatch(setSearch([]))
                }
            } else {
                dispatch(setSearch([]))
                dispatch(filterFreinds(e.target.value))
            }
        }}/>
    )
}


export default InputSearch