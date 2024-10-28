import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  c.status(400);
  c.header("Content-Type", "application/json");
  return c.json({ success: false, error: "No user ID provided" });
});

app.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      return c.json({
        success: false,
        error: "Invalid user ID",
      });
    }

    const request = await fetch(
      `https://friends.roblox.com/v1/users/${id}/followings?sortOrder=Asc&limit=100`
    );
    return c.json({ success: true, data: await request.json() });
  } catch (error) {
    c.status(500);
    return c.json({
      success: false,
      error: "An error occurred while fetching the data.",
    });
  }
});

export default app;