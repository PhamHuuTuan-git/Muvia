import { createSlice } from "@reduxjs/toolkit";

const authenSlice = createSlice({
    name: 'authen',
    initialState: {
       user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload  // Cho phép cập nhật trực tiếp từ state trước đó mà không cần coppy
        } // tao action { type: authen/setUser}
    }
})

export default authenSlice;