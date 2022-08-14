import { StyledH2 } from "../../App"
import CalendarEvent from "../../comp/Event/Calendar"
import SelectDate from "../../comp/Event/SelectDate"



const Event: React.FC = () => {

    return (
        <>
            <StyledH2>My events</StyledH2>
            <SelectDate />
            <CalendarEvent/>
        </>
    )
}


export default Event