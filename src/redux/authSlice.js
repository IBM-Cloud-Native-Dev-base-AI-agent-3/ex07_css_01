import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, registerThunk } from "../service/authThunk"
import { createLoadingReducers } from "./commonLoadingHandlers";

//로그인 새로고침 방지
const saveAuth = sessionStorage.getItem("auth")

const initialState = {
    isLoggedIn:false, username:null,loading:false,error:null,result:0
}
const authSlice = createSlice({
  name: "auth",
  initialState: saveAuth ? JSON.parse(saveAuth) : initialState,
  reducers: {
    //백엔드랑 연동 필요 없으니 여기에 작성
    logout : (state) => {
        sessionStorage.clear();
        return initialState;
    },
    socialLoginSuccess: (state, action) => {
        state.isLoggedIn = true;
        state.username = action.payload.username;
        state.error = null;
        sessionStorage.setItem("auth", JSON.stringify({ ...state }));
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.result = action.payload.result;
      if (action.payload.result === 0) {
        state.isLoggedIn = true;
        state.username = action.payload.username;
        sessionStorage.setItem("auth", JSON.stringify({ ...state }));
      }
    })
    createLoadingReducers(builder, loginThunk);

    builder
    .addCase(registerThunk.fulfilled, (state,action) => {
      state.loading = false;
      state.error = null;
      state.result = action.payload.result;
    })
    createLoadingReducers(builder, registerThunk);
  },
});
// export const {logout} = authSlice.actions -> headercom에 dispatch 사용
export default authSlice;