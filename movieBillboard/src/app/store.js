import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
 // Agrega la importación de movieSlice si la necesitas

export default configureStore({
  reducer: {
    user: userReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
