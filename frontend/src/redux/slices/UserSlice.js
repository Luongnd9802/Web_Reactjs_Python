// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    access_token: '',
    phone: '',
    avatar: '',
    id: '',
    isAdmin: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const { access_token, email, isAdmin, avatar, phone, id, name } = action.payload;
            state.access_token = access_token;
            state.email = email;
            state.isAdmin = isAdmin;
            state.avatar = avatar;
            state.name = name;
            state.id = id;
            state.phone = phone;

            console.log('User logged in:', state);
        },
        setUser: (state, action) => {
            const { name, email, phone, address, avatar, access_token } = action.payload;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.avatar = avatar;
            state.access_token = access_token;
        },
        updateUserProfile: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        updateAvatar: (state, action) => {
            state.avatar = action.payload; 
        },
        logout: (state) => {
            state.access_token = null;
            state.email = null;
            state.isAdmin = false;
            state.avatar = null;
            state.id = null;
            state.phone = null;
            state.name = null;
        },
    },
});

export const { setUser, updateUserProfile, login, logout, updateAvatar } = userSlice.actions;
export default userSlice.reducer;

// export const { updateUser } = userSlide.actions
