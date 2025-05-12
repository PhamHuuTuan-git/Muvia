import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        mode: false
    },
    reducers: {
        changeMode: (state, action) => {
            state.mode = action.payload  // Cho phép cập nhật trực tiếp từ state trước đó mà không cần coppy
        } // tao action { type: sidebar/changeMode}
    }
})

export default sidebarSlice;