import { Hono } from "hono";
import { cors } from "hono/cors";
import { trimTrailingSlash } from "hono/trailing-slash";
import { successResponse } from "./responses";
import router from "./routes/v1";

const app = new Hono();

app.use(cors());
app.use(trimTrailingSlash());
app.route("/v1", router);

app.get("*", (c) => {
  c.status(404);
  return c.json(
    successResponse({
      repository: "https://github.com/xvht/Solvent",
    })
  );
});

export default app;
