import { createAsyncThunk } from "@reduxjs/toolkit";

let data_set = [
  { username: "aaa", password: "aaa", role: "USER" },
  { username: "bbb", password: "bbb", role: "USER" },
  { username: "ccc", password: "ccc", role: "USER" },
];

let data_set2 = [
  { username: "string", password: "aaa", role: "1", region: "지역 구", chk1: "checkox" },
];

export const loginThunk = createAsyncThunk("loginThunk", async (user) => {
  console.log("login thunk user : ", user);
  const data = data_set.filter((data) => data.username === user.username)[0];
  let result = 1;
  if (data?.password === user.password) result = 0;
  return { result, username: user.username }; //성공0,실패1
});

export const registerThunk = createAsyncThunk("registerThunk", async (user) => {
  data_set2 = data_set2.concat(user);
  return { result: 0 };
});

export const memberThunk = createAsyncThunk("memberThunk", async () => {
  return data_set2;
});

export const memberOneThunk = createAsyncThunk("memberOneThunk", async (user) => {
  const data = data_set.filter(d => d.username === user.username)[0];
  return data;
});

export const memberDeleteThunk = createAsyncThunk("memberDeleteThunk", async (user) => {
  data_set = data_set.filter(d => d.username !== user.username);
  return 1;
});

export const memberModifyThunk = createAsyncThunk("memberModifyThunk", async (user) => {
  data_set = data_set.filter(d => d.username !== user.username);
  data_set = data_set.concat(user)
  return 1;
});