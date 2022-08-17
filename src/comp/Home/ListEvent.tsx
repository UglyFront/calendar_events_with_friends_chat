import {DownOutlined, DashOutlined} from "@ant-design/icons"
import { Event, WrapperEvent } from "./Profile"
import MyEvent from "./MyEvent"
import React from "react"



interface IPropsListEvent {
    invites?: boolean
}


const ListEvent: React.FC<IPropsListEvent> = ({invites}) => {
    const [visibleMyEvent, setVME] = React.useState<boolean>(false)
    return (
         <>
        <p style={{marginTop: "30px", display: "inline-block"}} onClick={() => setVME(prev => !prev)}>{invites ? "Меня пригласили":"Мои события"}</p>
        <DownOutlined onClick={() => setVME(prev => !prev)} style={visibleMyEvent ? {marginBottom: "2px", marginLeft: "15px", transform: 'rotate(180deg)', transition: ".3s"} : {marginBottom: "2px", marginLeft: "15px", transition: ".3s"}}/>
        <WrapperEvent style={visibleMyEvent ? {height: "100%",  transform: 'translateX(0%)'} : {height: "0px",  transform: 'translateX(-100%)'}}>
            <MyEvent/>
            <MyEvent/>
            <MyEvent/>
            <MyEvent/>
            <MyEvent/>
            <MyEvent/>
            <MyEvent/>
            <MyEvent/>
            <MyEvent/>
        </WrapperEvent>
         </>
    )
}

export default ListEvent