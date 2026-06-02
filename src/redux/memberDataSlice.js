import { createSlice } from "@reduxjs/toolkit";
import { memberDeleteThunk, memberModifyThunk, memberOneThunk, memberThunk } from "../service/authThunk";


const memberDataSlice = createSlice({
    name : "memberDataSlice",
    initialState : {data:null, dataOne : null, result : 0},
    extraReducers : (builder) => {
        builder
        .addCase(memberThunk.fulfilled, (state,action) => {
            state.data = action.payload
        })

        builder
        .addCase(memberOneThunk.fulfilled, (state,action) => {
            state.dataOne = action.payload
        })

        builder
        .addCase(memberDeleteThunk.fulfilled, (state,action) => {
            state.result = action.payload
        })

        builder.addCase(memberModifyThunk.fulfilled, (state, action) => {
          state.result = action.payload;
        });
    }
})

export default memberDataSlice;