import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";


import type { AppStore, RootState } from "@/redux/store";
// As a basic setup, import your same slice reducers
import postReducer from "@/redux/slices/postSlice";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
	route?: string,
}

export function renderWithProviders(
	ui: React.ReactElement,
	{
		route = '/',
		preloadedState = { posts: [] },
		// Automatically create a store instance if no store was passed in
		store = configureStore({ reducer: { posts: postReducer }, preloadedState }),
		...renderOptions
	}: ExtendedRenderOptions = {},
) {
	function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
		return (
			<Provider store={store}>
				<BrowserRouter>{children}</BrowserRouter>
			</Provider>
		);
	}

	window.history.pushState({}, "Test page", route);

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }), user: userEvent.setup(), };
}
