import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "../components/Sidebar/sidebarSlice";
import authenSlice from "../redux-toolkit/slices/authen.slice";
const store = configureStore({
    reducer: {
        sidebar: sidebarSlice.reducer,
        authen: authenSlice.reducer
    }
})

export default store