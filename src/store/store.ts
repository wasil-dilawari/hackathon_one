// import { configureStore } from "@reduxjs/toolkit";
// import cartSlice from "./slice/cartSlice";

// export const store = configureStore({
//   reducer: {
//     cart: cartSlice,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import drizzleCartMiddleware from "../components/middleware/drizzleCartMiddleware"; // Import your custom middleware

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(drizzleCartMiddleware),
});

store.dispatch({ type: "@@INIT" });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
