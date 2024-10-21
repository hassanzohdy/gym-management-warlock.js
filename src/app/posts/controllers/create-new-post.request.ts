import {
  v,
  type Request,
  type RequestHandler,
  type Response,
} from "@warlock.js/core";

export const createNewPostRequest: RequestHandler = async (
  request: Request,
  response: Response,
) => {
  return response.success({
    message: "Post created successfully",
  });
};

createNewPostRequest.validation = {
  schema: v.object({
    title: v.string().required().minLength(4),
    content: v.string().required(),
  }),
};
