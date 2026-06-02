import logo from "./logo.svg";
import "./App.css";
import Test03 from "./components/test/TestCom03";
import { Route, Routes } from "react-router-dom";
import LoginCon from "./containers/LoginCon";
import IndexCon from "./containers/IndexCon";
import RegCon from "./containers/RegCon";
import ListCon from "./containers/ListCon";
import InfoCon from "./containers/InfoCon";
import HeaderCom from "./components/common/HeaderCom";
import ModifyCon from "./containers/ModifyCon";
import RentalCon from "./containers/RentalCon";
import RentalListCon from "./containers/RentalListCon";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";

function App() {
  return (
    <>
      <Routes>
        <Route element={<HeaderCom />}>
          <Route path="/" element={<IndexCon />} />
          <Route path="/login" element={<LoginCon />} />
          <Route path="/register" element={<RegCon />} />
          <Route path="/list" element={<ListCon />} />
          <Route path="/rental" element={<RentalCon />} />
          <Route path="/rentalList" element={<RentalListCon />} />
          <Route path="/info/:username" element={<InfoCon />} />
          <Route path="/modify/:username" element={<ModifyCon />} />
          {/* ◀ 백엔드가 리다이렉트하는 주소와 컴포넌트를 연결합니다 */}
          <Route
            path="/oauth2/redirect/"
            element={<OAuth2RedirectHandler />}
          />
        </Route>
      </Routes>

      {/* 
    <Test03 test={"안녕하세요"} />
  */}
    </>
  );
}

export default App;
