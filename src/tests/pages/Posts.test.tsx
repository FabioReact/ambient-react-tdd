import { screen, within } from "@testing-library/react";
import { AuthProvider } from "@/context/auth-context";
import { Routes } from "react-router-dom";
import { AppRoutes } from "@/Routes";
import { renderWithProviders } from "../utils/utils-redux";
import Posts from "@/pages/Posts";
import { setupStore } from '@/redux/store'

describe("Posts Page", () => {
	it("should show a list of all posts", async () => {
		// arrange
		const store = setupStore()
		// store.dispatch()
		const posts = [{ id: 1, author: "Fabio Test", title: "Post title" }]
		renderWithProviders(<Posts />, {
			preloadedState: {
				posts,
			},
			// store,
		});

		// assert
		// expect(store.getState())
		// expect(screen.getAllByRole('listitem')[0]).toHaveTextContent(posts[0].title)
		// expect(screen.getAllByRole('listitem').length).toBe(posts.length)
	});
});
