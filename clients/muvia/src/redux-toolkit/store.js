import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "../components/Sidebar/sidebarSlice";
const store = configureStore({
    reducer: {
        sidebar: sidebarSlice.reducer
    }
})

export default store