import usersSlice from "./usersSlice";
import loaderSlice from "./loaderSlice";
import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./AiQuestionSlice";

const store = configureStore({
    reducer: {
        users: usersSlice,
        loaders: loaderSlice,
        Reducer:Reducer
    }
})

export default store