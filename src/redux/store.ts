import { configureStore, combineReducers, PreloadedState } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";

const rootReducer = combineReducers({
  posts: postReducer,
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
	return configureStore({
		reducer: rootReducer,
	});
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
