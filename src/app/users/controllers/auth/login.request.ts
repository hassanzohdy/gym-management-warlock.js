import type { RequestHandler } from "@warlock.js/core";
import { v, type Request, type Response } from "@warlock.js/core";
import { User } from "app/users/models/user";

export const loginRequest: RequestHandler = async (
  request: Request<User>,
  response: Response,
) => {
  const user = request.user;

  const auth = await user.generateAccessToken();

  user.save({
    lastLogin: new Date(),
  });

  return response.success({
    user: {
      ...(await user.toJSON()),
      accessToken: auth,
      userType: user.userType,
    },
  });
};

loginRequest.validation = {
  schema: v.object({
    email: v.string().email().required(),
    password: v.string().required(),
  }),
  validate: async (request: Request, response: Response) => {
    const user = await User.attempt(request.only(["email", "password"]));

    if (!user) {
      return response.badRequest({
        error: request.t("auth.invalidCredentials"),
      });
    }

    if (!user.isActive) {
      // you can send the activation code again
      // or just return a bad request with an error message
      return response.forbidden({
        error: request.t("auth.accountNotActivated"),
      });
    }

    request.user = user;
  },
};
