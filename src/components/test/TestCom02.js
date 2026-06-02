import styled from "styled-components";
const colorList = ["red", "skyblue"];
const StyleDiv01 = styled.div`
  font-size: 30px;
  background-color: beige;
`;
const StyleH1 = styled.h1`
  background-color: ${colorList[0]};
  color: ${colorList[1]};
`;
function Test02() {
  //const num = 1111;
  //console.log(`num : ${num}`)
  return (
    <>
      <StyleDiv01>Test02</StyleDiv01>
      <StyleH1>Test02</StyleH1>
    </>
  );
}
export default Test02;
//yarn add styled-components
