import Item from "antd/lib/list/Item"
import { StyledH2 } from "../../App"
import { Input } from "../../comp/Friends/InputSearch"
import { List } from "../../comp/Friends/ListFriends"
import ItemMsg from "../../comp/Messages/ItemMsg"



const Messages: React.FC = () => {

    return (
        <>
            <StyledH2>My chats</StyledH2>
            <Input style={{marginTop: "30px"}} placeholder="Поиск"/>
            <List>
                <ItemMsg id={String(Math.floor(Math.random()*22222))}/>
                <ItemMsg id={String(Math.floor(Math.random()*22222))}/>
                <ItemMsg id={String(Math.floor(Math.random()*22222))}/>
                <ItemMsg id={String(Math.floor(Math.random()*22222))}/>
                <ItemMsg id={String(Math.floor(Math.random()*22222))}/>
                <ItemMsg id={String(Math.floor(Math.random()*22222))}/>
                <ItemMsg id={String(Math.floor(Math.random()*22222))}/>
                <ItemMsg id={String(Math.floor(Math.random()*22222))}/>
                <ItemMsg id={String(Math.floor(Math.random()*22222))}/>
                <ItemMsg id={String(Math.floor(Math.random()*22222))}/>
            </List>
        </>
    )
}


export default Messages