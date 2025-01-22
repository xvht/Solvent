import { Hono } from "hono";
import {
  badRequestResponse,
  serverErrorResponse,
  successResponse,
} from "./responses";

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
      c.status(400);
      return c.json(badRequestResponse("Invalid user ID"));
    }

    let nextPageCursor = "";
    let friends: any[] = [];

    do {
      const cursorParam = nextPageCursor ? `&cursor=${nextPageCursor}` : "";
      const request = await fetch(
        `https://friends.roblox.com/v1/users/${id}/friends?sortOrder=Asc&limit=100${cursorParam}`
      );
      const data = await request.json();

      friends = friends.concat(data.data);
      nextPageCursor = data.nextPageCursor;
    } while (nextPageCursor);

    return c.json(successResponse(friends));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data.")
    );
  }
});

app.get("/:id/friends/count", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      c.status(400);
      return c.json(badRequestResponse("Invalid user ID"));
    }

    let nextPageCursor = "";
    let friendsCount = 0;

    do {
      const cursorParam = nextPageCursor ? `&cursor=${nextPageCursor}` : "";
      const request = await fetch(
        `https://friends.roblox.com/v1/users/${id}/friends?sortOrder=Asc&limit=100${cursorParam}`
      );
      const data = await request.json();

      friendsCount += data.data.length;
      nextPageCursor = data.nextPageCursor;
    } while (nextPageCursor);

    return c.json(successResponse(friendsCount));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data.")
    );
  }
});

app.get("/:id/following", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      c.status(400);
      return c.json(badRequestResponse("Invalid user ID"));
    }

    let nextPageCursor = "";
    let following: any[] = [];

    do {
      const cursorParam = nextPageCursor ? `&cursor=${nextPageCursor}` : "";
      const request = await fetch(
        `https://friends.roblox.com/v1/users/${id}/followings?sortOrder=Asc&limit=100${cursorParam}`
      );
      const data = await request.json();

      following = following.concat(data.data);
      nextPageCursor = data.nextPageCursor;
    } while (nextPageCursor);

    return c.json(successResponse(following));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data.")
    );
  }
});

app.get("/:id/following/count", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      c.status(400);
      return c.json(badRequestResponse("Invalid user ID"));
    }

    let nextPageCursor = "";
    let followingCount = 0;

    do {
      const cursorParam = nextPageCursor ? `&cursor=${nextPageCursor}` : "";
      const request = await fetch(
        `https://friends.roblox.com/v1/users/${id}/followings?sortOrder=Asc&limit=100${cursorParam}`
      );
      const data = await request.json();

      followingCount += data.data.length;
      nextPageCursor = data.nextPageCursor;
    } while (nextPageCursor);

    return c.json(successResponse(followingCount));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data.")
    );
  }
});

app.get("/:id/followers", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      c.status(400);
      return c.json(badRequestResponse("Invalid user ID"));
    }

    let nextPageCursor = "";
    let followers: any[] = [];

    do {
      const cursorParam = nextPageCursor ? `&cursor=${nextPageCursor}` : "";
      const request = await fetch(
        `https://friends.roblox.com/v1/users/${id}/followers?sortOrder=Asc&limit=100${cursorParam}`
      );
      const data = await request.json();

      followers = followers.concat(data.data);
      nextPageCursor = data.nextPageCursor;
    } while (nextPageCursor);

    return c.json(successResponse(followers));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data.")
    );
  }
});

app.get("/:id/followers/count", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      c.status(400);
      return c.json(badRequestResponse("Invalid user ID"));
    }

    let nextPageCursor = "";
    let followersCount = 0;

    do {
      const cursorParam = nextPageCursor ? `&cursor=${nextPageCursor}` : "";
      const request = await fetch(
        `https://friends.roblox.com/v1/users/${id}/followers?sortOrder=Asc&limit=100${cursorParam}`
      );
      const data = await request.json();

      followersCount += data.data.length;
      nextPageCursor = data.nextPageCursor;
    } while (nextPageCursor);

    return c.json(successResponse(followersCount));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data.")
    );
  }
});

export default app;
