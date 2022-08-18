import styled from "styled-components"



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

    return (
        <Input placeholder={props.global ? "Найти нового друга" : "Поиск среди друзей"}/>
    )
}


export default InputSearch