import {DownOutlined, DashOutlined} from "@ant-design/icons"
import { Event } from "./Profile"



interface MyEventCardProps {
    eventEl: any,
    my?: boolean
}

const MyEvent: React.FC<MyEventCardProps> = ({my, eventEl}) => {
    return (
        
            <Event>
                <h3>{eventEl.name}</h3>
                <span>{eventEl.date} {eventEl.timestart}-{eventEl.timeend}</span>
                <h5>{eventEl.description}</h5>
                <DashOutlined style={{position: "absolute", bottom: 0}}/>
            </Event>
    )
}

export default MyEvent