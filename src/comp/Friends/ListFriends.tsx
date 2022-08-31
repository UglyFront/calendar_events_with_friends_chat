import styled from "styled-components"
import { StyledH2 } from "../../App"
import { useAppSelector } from "../../store/store"
import { statusEnum, statusFriends } from "../../types/user"
import FriendsItem from "./FriendsItem"





export const List = styled.ul`
    max-width: 600px;
    height: 70vh;
    margin-top: 20px;
    padding: 5px;

    &::-webkit-scrollbar {
        width: 1px;
      }
`

const ListFriends: React.FC = (props) => {

    const {friends, searchUser, filterFriends} = useAppSelector(state => state.reducer.userReducer)

    return (
        <>
            <StyledH2 style={{marginTop: "20px"}}>My friends / Searching...</StyledH2>
            <List>
                {!searchUser.length && !filterFriends.length && !friends.length ?
                    <p>У вас нет друзей...</p>
                :
                    friends.length && !searchUser.length && !filterFriends.length ?
                    friends.map((el: any) =>  {
                        if (el.status == statusFriends.ACCEPT) {
                            return <FriendsItem my={true} profile={el.friend}/>
                        }
                    })
                    :
                    searchUser.length && !filterFriends.length ?
                    searchUser.map((el: any) => {
                        return <FriendsItem profile={el} send={true}/>
                    })
                    :
                    !searchUser.length && filterFriends.length?
                    filterFriends.map((el: any) => <FriendsItem my={true} profile={el}/>)
                    :
                    <p>ШО</p>
                }
            </List>
        </>
    )
}


export default ListFriends