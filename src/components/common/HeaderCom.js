import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import authSlice from "../../redux/authSlice";
import { StyleContentBlock, StyleContentWrap } from "./StyleContent";
const WrapBlock = styled.div`
  position: fixed;
  z-index: 1;
  background-color: white;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const StyleHeader = styled.header`
  margin: 0 auto;
  width: 1100px;
  display: flex;
  height: 100px;
  align-items: center;
`;
const StyleTitle = styled.h1`
  width: 200px;
  .link {
    color: black;
  }
  .link:hover {
    color: gray;
  }
`;
const StyleNav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  ul {
    display: flex;
  }
  ul li {
    margin-right: 30px;
  }
  .menu li a {
    font-size: 20px;
    font-weight: bold;
  }
  a {
    color: black;
  }
  a:hover {
    color: gray;
  }
`;
const HeaderCom = () => {
  const {isLoggedIn, username} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const onLogout = (e) => {
    e.preventDefault();
    dispatch(authSlice.actions.logout())
  }
  return (
    <>
      <WrapBlock>
        <StyleHeader>
          <StyleTitle>
            <Link to="/" className="link">
              헤더로고
            </Link>
          </StyleTitle>
          <StyleNav>
            <ul className="menu">
              {/* <li>
                <Link to="/">사료</Link>
              </li>
              <li>
                <Link to="/">간식</Link>
              </li>
              <li>
                <Link to="/list">목록보기</Link>
              </li> */}
              <li>
                <Link to="/rental">RentalForm</Link>
              </li>
              <li>
                <Link to="/rentalList">RentalList</Link>
              </li>
            </ul>
            <ul>
              {isLoggedIn ? (
                <>
                  <li>
                    {username}님
                    <Link to="/logout" onClick={onLogout}>
                      로그아웃
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">로그인</Link>
                  </li>
                  <li>
                    <Link to="/register">회원가입</Link>
                  </li>
                </>
              )}
            </ul>
          </StyleNav>
        </StyleHeader>
      </WrapBlock>

      <StyleContentBlock>
        <StyleContentWrap>
          <Outlet />
        </StyleContentWrap>
      </StyleContentBlock>
    </>
  );
};
export default HeaderCom;
