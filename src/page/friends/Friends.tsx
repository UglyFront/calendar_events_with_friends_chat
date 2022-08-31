import { StyledH2 } from "../../App"
import FormSearch from "../../comp/Friends/FormSearch"
import ListFriends from "../../comp/Friends/ListFriends"




const Friends: React.FC<any> = (props) => {

    return (
        <>
            <StyledH2 onClick={() => props.ws.send("кидк френд")}>My friends</StyledH2>
            <FormSearch/>
            <ListFriends/>
        </>
    )
}


export default Friends