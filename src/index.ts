import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  c.header("Content-Type", "application/json");
  return c.json({ success: false, error: "Please provide a User ID." });
});

app.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (!id || isNaN(id)) {
    return c.json({ success: false, error: "Please provide a valid User ID." });
  }

  const request = await fetch(
    `https://friends.roblox.com/v1/users/${id}/followings?sortOrder=Asc`
  );
  return c.json({ success: true, data: await request.json() });
});

export default {
  port: 3001,
  fetch: app.fetch,
};
