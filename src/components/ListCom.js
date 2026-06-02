import {StyleContentBlock, StyleContentWrap} from "../components/common/StyleContent"
import styled from "styled-components";
import { OPTIONS } from "../options/options";
import { checkboxOptions } from "../options/checkbox";
const ListTitle = styled.div`
  color: brown;
  font-size: 30px;
  width: 200px;
  text-align: center;
  margin: 20px auto;
`;
const DivWrap = styled.div`
  margin: auto;
  width: 50%;
  border-top: 1px solid gray;
`;
const DivContent = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  padding: 15px;
`;
const DivPage = styled.div`
  margin-top: 20px;
  text-align: center;
`;
const SpanPage = styled.span`
  width: 30px;
  display: inline-block;
  cursor: pointer;
  color: ${(props) => (props.$active ? "red" : "black")};
  &:hover {
    font-weight: bold;
  }
`;

const ListCom = ({data, onInfo}) => {
  return (
    <>
      <ListTitle>회원목록</ListTitle>
      <DivWrap>
        <DivContent>
          <b>아이디</b>
          <b>비밀번호</b>
          <b>select1</b>
          <b>select2</b>
          <b>checkbox</b>
        </DivContent>

        {data &&
          data.map((d) => (
            <DivContent key={d.username}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => onInfo(d.username)}
              >
                {d.username}
              </span>
              <span>{d.password}</span>
              <span>
                {" "}
                {OPTIONS.find((option) => option.value == d.role)?.label}
              </span>
              <span>
                {/* {d.city} {d.district}  */}
                {d.region}
              </span>
              <span>
                {Array.isArray(d.chk1) ? d.chk1.join(",") : d.chk1}
              </span>
              {/* <span>{d.role}</span> */}
            </DivContent>
          ))}
      </DivWrap>
    </>
  );
};
export default ListCom;
