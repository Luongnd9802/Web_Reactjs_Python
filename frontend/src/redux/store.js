import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './slices/UserSlice'; // Sử dụng tên rõ ràng hơn

const store = configureStore({
    reducer: {
        user: userSliceReducer, // Tên biến rõ ràng để tránh nhầm lẫn với useReducer
    },
});

export default store;
