import styled from "styled-components"

const Info = styled.div`
    width: 70%;
    height: 70px;
    margin-top: 30px;
    display: flex;
    position: relative;

    .img {
        width: 70px;
        height: 70px;
        background: green;
        border-radius: 50%;
    }

    .text {
        margin-left: 10px;
    }

    .leave {
        position: absolute;
        right: 0;
        margin-top: 25px;
        color: red;
        cursor: pointer;
    }
`



const InfoChat: React.FC  = () => {

    return(
        <Info>
            <div className="img"></div>
            <div className="text">
                <h3>Имя чата</h3>
                <p>Участников 6</p>
                <p>В сети 3</p>
            </div>
            <p className="leave">Покинуть чат</p>
        </Info>
    )
}


export default InfoChat