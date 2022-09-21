import Item from "antd/lib/list/Item"
import { StyledH2 } from "../../App"
import { Input } from "../../comp/Friends/InputSearch"
import { List } from "../../comp/Friends/ListFriends"
import ItemMsg from "../../comp/Messages/ItemMsg"
import { useAppSelector } from "../../store/store"



const Messages: React.FC = () => {

    const friends = useAppSelector(state => state.reducer.userReducer.friends)
    const events = useAppSelector(state => state.reducer.headerReducer.events)

    return (
        <>
            <StyledH2>My chats</StyledH2>
            {/* <Input style={{marginTop: "30px"}} placeholder="Поиск"/> */}
            <List>
                <p style={{marginBottom: "10px"}}>Chats friends</p>
                {friends.map((el: any) =>  <ItemMsg id={String(el.id)} profile={el.friend}/> )}

                <p style={{marginBottom: "10px"}}>Chats event</p>
                {events.map((el: any) =>  <ItemMsg id={String(el.id + "event")} isEvent event={el}/> )}
            </List>
        </>
    )
}


export default Messages