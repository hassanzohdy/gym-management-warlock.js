import { router } from "@warlock.js/core";
import { createNewPostRequest } from "./controllers/create-new-post.request";

router.post("/posts", createNewPostRequest);
