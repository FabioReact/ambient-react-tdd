import { User, registerUser } from "@/api/user";
// Mettre en place un mock de notre API grâce à msw
import { rest } from "msw";
import { server } from '@/tests/utils/setup-server'

beforeAll(() => {
	server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => {
	server.close();
});

describe("user requests", () => {
	describe("registerUser", () => {
		it("should a valid accessToken", async () => {
			const response = (await registerUser({
				email: "valid@email.com",
				password: "validPassword",
			})) as { accessToken: string };
			expect(response.accessToken).toBe("xxx.xxx.xxx");
		});
	
		it("should return missing param error", async () => {
			server.use(
				rest.post("http://localhost:4000/register", (req, res, ctx) => {
					return res(
						ctx.status(400),
						ctx.json("Email and password are required"),
					);
				}),
			);
			const response = (await registerUser({
				password: "",
			} as User)) as { error: string };
			expect(response.error).toBe("Email and password are required");
		});
	});
});
