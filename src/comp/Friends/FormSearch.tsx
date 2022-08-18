import styled from "styled-components"
import InputSearch from "./InputSearch"



const Form = styled.div`
    max-width: 350px;
    height: 50px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`


const FormSearch: React.FC = () => {

    return (
        <Form>
            <InputSearch/>
            <InputSearch global = {true}/>
        </Form>
    )
}


export default FormSearch