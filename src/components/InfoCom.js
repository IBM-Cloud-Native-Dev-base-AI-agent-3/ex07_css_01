import styled from "styled-components";
import { StyleContentBlock, StyleContentWrap } from "./common/StyleContent";
import { ProductTitle } from "./common/StyleProduct";
import StyledButton from "./common/StyleButton";

const InfoWrap = styled.div`
width: 30%;margin:auto;border:1px solid gray;vorder-radius:5px;font-size:24px;padding:20px;
`;

const InfoCom = ({data,onDelete,onModifyForm}) => {
    return (<>
            <ProductTitle>개인정보</ProductTitle>
            <InfoWrap>
            {data && <>
            username<br /> - {data.username}<hr />
            password<br /> - {data.password}<hr />
            role<br /> - {data.role}<hr />
            </>}
            <StyledButton onClick={onDelete}>삭제</StyledButton>
            <StyledButton onClick={onModifyForm}>수정</StyledButton>
        </InfoWrap>
        
    </>)
}
export default InfoCom;