import {  StyledH2 } from "../../App"
import CalendarEvent from "../../comp/Event/Calendar"
import SelectDate from "../../comp/Event/SelectDate"

import React from 'react';





const Event: React.FC = () => {
    const top = React.useRef<any>()


    return (
        <>
            
            <StyledH2 ref={top}>My events</StyledH2>
            <SelectDate />
            <CalendarEvent top={top}/>

        </>
    )
}


export default Event