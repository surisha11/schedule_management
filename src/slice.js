import { createSlice } from "@reduxjs/toolkit";

const initialValue   = {
    usersName : ''
}

const userSlice = createSlice({
    name : 'user',
    initialState : initialValue,
    reducers : {
        check : (state, action  ) => {
                    state.usersName = action.payload;
            }
        }
    },
)

export default userSlice.reducer;

export const { check } =  userSlice.actions;