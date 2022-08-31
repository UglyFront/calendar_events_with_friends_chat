import { StyledH2 } from "../../App"
import Profile from "../../comp/Home/Profile"
import { useAppSelector } from "../../store/store"



const Home: React.FC = () => {

    return (
        <>
            <StyledH2>My home</StyledH2>
            <Profile/>
        </>
    )
}


export default Home