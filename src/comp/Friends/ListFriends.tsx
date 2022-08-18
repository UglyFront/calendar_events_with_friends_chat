import styled from "styled-components"
import { StyledH2 } from "../../App"
import FriendsItem from "./FriendsItem"





export const List = styled.div`
    max-width: 600px;
    height: 100%;
    margin-top: 20px;
    padding: 5px
`

const ListFriends: React.FC = (props) => {

    return (
        <>
            <StyledH2 style={{marginTop: "20px"}}>My friends / Searching...</StyledH2>
            <List>
                <FriendsItem my={true}/>
                <FriendsItem/>
                <FriendsItem my={true}/>
                <FriendsItem my={true}/>
                <FriendsItem/>
                <FriendsItem/>
                <FriendsItem/>
                <FriendsItem/>
                <FriendsItem/>
                <FriendsItem/>
                <FriendsItem/>
                <FriendsItem/>
                <FriendsItem/>
                <FriendsItem/>
                <FriendsItem/>
                <FriendsItem/>
            </List>
        </>
    )
}


export default ListFriends