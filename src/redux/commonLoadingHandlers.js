export const createLoadingReducers = (builder, asyncThunk) => {
    builder
    .addCase(asyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(asyncThunk.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.error.messege;
    })
}