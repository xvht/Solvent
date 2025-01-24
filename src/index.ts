import { Hono } from "hono";
import { badRequestResponse } from "./responses";
import router from "./routes/v1";

const app = new Hono();

app.route("/v1", router);

app.get("*", (c) => {
  c.status(404);
  return c.json(badRequestResponse("Invalid endpoint"));
});

export default app;
