import { setupServer } from "msw/node";
import { rest } from "msw";

export const server = setupServer(
	rest.post("http://localhost:4000/register", (req, res, ctx) => {
		return res(ctx.json({ accessToken: "xxx.xxx.xxx" }));
	}),
);