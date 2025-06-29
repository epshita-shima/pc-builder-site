import { configureStore } from "@reduxjs/toolkit";
import pcBuilderReducer from "./pcBuilderSlice";

const store = configureStore({
  reducer: {
    pcBuilder: pcBuilderReducer,
  },
});

export default store;