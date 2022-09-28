import {DownOutlined, DashOutlined, PropertySafetyFilled} from "@ant-design/icons"
import { WrapperEvent } from "./Profile"
import MyEvent from "./MyEvent"
import React from "react"
import { useAppSelector } from "../../store/store"



interface IPropsListEvent {
    invites?: boolean
}


const ListEvent: React.FC<IPropsListEvent> = ({invites}) => {
    const [visibleMyEvent, setVME] = React.useState<boolean>(false)

    const events = useAppSelector(state => state.reducer.headerReducer.events)
    const user = useAppSelector(state => state.reducer.userReducer.user)
    return (
         <>
        <p style={{marginTop: "30px",  display: "inline-block"}} onClick={() => setVME(prev => !prev)}>{invites ? "Меня пригласили":"Мои события"}</p>
        <DownOutlined onClick={() => setVME(prev => !prev)} style={visibleMyEvent ? {marginBottom: "3px", marginLeft: "15px", transform: 'rotate(180deg)', transition: ".3s"} : {marginBottom: "3px", marginLeft: "15px", transition: ".3s"}}/>
        <WrapperEvent style={visibleMyEvent ? {height: "100%",  transform: 'translateX(0%)'} : {height: "0px",  transform: 'translateX(-100%)'}}>
            {events.map((el: any) => {
                if (el.ownerId == user.id && !invites) {
                    return <MyEvent key = {el.id} eventEl={el}/>
                }
            })}

            {events.map((el: any) => {
                if (el.ownerId !== user.id && invites) {
                    return <MyEvent  key = {el.id} eventEl={el}/>
                }
            })}     
        </WrapperEvent>
         </>
    )
}

export default ListEvent