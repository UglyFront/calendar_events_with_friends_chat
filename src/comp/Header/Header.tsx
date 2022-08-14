import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { IStyledHeader } from "../../App"
import { setVisible } from "../../store/header"
import {CloseOutlined, MenuOutlined, HomeTwoTone, CalendarTwoTone, SmileTwoTone, MessageTwoTone } from "@ant-design/icons"


export interface HeaderProps {
    visible: boolean,
    setVisible: () => any
}


const StyledHeader = styled.header<IStyledHeader>`
    width: 90px;
    height: 100vh;
    box-shadow: 15px 0px 20px 0px #CBCAFF;
    word-break: break-all;
    position: relative;
    left: ${(props) => props.visible ? "0px" : "-90px"};
    transition: .3s;
    overflow-x: visible;
`


const Handler = styled.div`
    width: 30px;
    height: 60px;
    background: #CBCAFF;
    position: absolute;
    right: -30px;
    z-index: 1;
    color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .3s;

    &:hover {
        background: #5790FF;
    }
`








const Header: React.FC<any> = (props) => {
    const visibleHeader = useAppSelector(state => state.reducer.headerReducer.visible)
    const dispatch = useAppDispatch()

    return (
        <StyledHeader visible={visibleHeader}>
            <Handler onClick={() => dispatch(setVisible())}>
                <span>{visibleHeader ? <CloseOutlined /> : <MenuOutlined />}</span>
            </Handler>
            <HomeTwoTone style={{fontSize: 40, marginBottom: "25vh", marginTop: "20px", marginLeft: "20px"}}/>
            <CalendarTwoTone style={{fontSize: 40, marginBottom: "10px", marginTop: "20px", marginLeft: "20px"}}/>
            <SmileTwoTone style={{fontSize: 40, marginBottom: "10px", marginTop: "20px", marginLeft: "20px"}}/>
            <MessageTwoTone style={{fontSize: 40, marginBottom: "10px", marginTop: "20px", marginLeft: "20px"}}/>
        </StyledHeader>
    )
}

export default Header