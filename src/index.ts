import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  c.status(400);
  c.header("Content-Type", "application/json");
  return c.json({ success: false, error: "No user ID provided" });
});

app.get("/:id/friends", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      return c.json({
        success: false,
        error: "Invalid user ID",
      });
    }

    const request = await fetch(
      `https://friends.roblox.com/v1/users/${id}/friends?sortOrder=Asc&limit=100`
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

app.get("/:id/friends/count", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      return c.json({
        success: false,
        error: "Invalid user ID",
      });
    }

    let nextPageCursor = "";
    let totalCount = 0;

    do {
      const cursorParam = nextPageCursor ? `&cursor=${nextPageCursor}` : "";
      const request = await fetch(
        `https://friends.roblox.com/v1/users/${id}/friends?sortOrder=Asc&limit=100${cursorParam}`
      );
      const data = await request.json();

      totalCount += data.data.length;
      nextPageCursor = data.nextPageCursor;
    } while (nextPageCursor);

    return c.json({
      success: true,
      totalFriends: totalCount,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      success: false,
      error: "An error occurred while fetching the data.",
    });
  }
});

app.get("/:id/following", async (c) => {
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

app.get("/:id/following/count", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      return c.json({
        success: false,
        error: "Invalid user ID",
      });
    }

    let nextPageCursor = "";
    let totalCount = 0;

    do {
      const cursorParam = nextPageCursor ? `&cursor=${nextPageCursor}` : "";
      const request = await fetch(
        `https://friends.roblox.com/v1/users/${id}/followings?sortOrder=Asc&limit=100${cursorParam}`
      );
      const data = await request.json();

      totalCount += data.data.length;
      nextPageCursor = data.nextPageCursor;
    } while (nextPageCursor);

    return c.json({
      success: true,
      totalFollowing: totalCount,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      success: false,
      error: "An error occurred while fetching the data.",
    });
  }
});

app.get("/:id/followers", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      return c.json({
        success: false,
        error: "Invalid user ID",
      });
    }

    const request = await fetch(
      `https://friends.roblox.com/v1/users/${id}/followers?sortOrder=Asc&limit=100`
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

app.get("/:id/followers/count", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      return c.json({
        success: false,
        error: "Invalid user ID",
      });
    }

    let nextPageCursor = "";
    let totalCount = 0;

    do {
      const cursorParam = nextPageCursor ? `&cursor=${nextPageCursor}` : "";
      const request = await fetch(
        `https://friends.roblox.com/v1/users/${id}/followers?sortOrder=Asc&limit=100${cursorParam}`
      );
      const data = await request.json();

      totalCount += data.data.length;
      nextPageCursor = data.nextPageCursor;
    } while (nextPageCursor);

    return c.json({
      success: true,
      totalFollowers: totalCount,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      success: false,
      error: "An error occurred while fetching the data.",
    });
  }
});

export default app;
