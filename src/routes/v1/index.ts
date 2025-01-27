import { Hono } from "hono";
import {
  badRequestResponse,
  serverErrorResponse,
  successResponse,
} from "../../responses";

const router = new Hono();

const ROPRO_API_URL = "https://api.ropro.io/getUserInfoTest.php";
const FRIENDS_API_URL = "https://friends.roblox.com/v1";
const GROUPS_API_URL = "https://groups.roblox.com/v2";

router.get("/", (c) => {
  c.status(400);
  return c.json(badRequestResponse("No user ID provided"));
});

router.get("/:id/friends", async (c) => {
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
        `${FRIENDS_API_URL}/users/${id}/friends?sortOrder=Asc&limit=100${cursorParam}`
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

router.get("/:id/friends/count", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      c.status(400);
      return c.json(badRequestResponse("Invalid user ID"));
    }

    const data = await fetch(
      `${FRIENDS_API_URL}/users/${id}/friends/count`
    ).then((res) => res.json());

    return c.json(successResponse(data.count));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data.")
    );
  }
});

router.get("/:id/following", async (c) => {
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
        `${FRIENDS_API_URL}/users/${id}/followings?sortOrder=Asc&limit=100${cursorParam}`
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

router.get("/:id/following/count", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      c.status(400);
      return c.json(badRequestResponse("Invalid user ID"));
    }

    const data = await fetch(
      `${FRIENDS_API_URL}/users/${id}/followings/count`
    ).then((res) => res.json());

    return c.json(successResponse(data.count));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data.")
    );
  }
});

router.get("/:id/followers", async (c) => {
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
        `${FRIENDS_API_URL}/users/${id}/followers?sortOrder=Asc&limit=100${cursorParam}`
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

router.get("/:id/followers/count", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      c.status(400);
      return c.json(badRequestResponse("Invalid user ID"));
    }

    const data = await fetch(
      `${FRIENDS_API_URL}/users/${id}/followers/count`
    ).then((res) => res.json());

    return c.json(successResponse(data.count));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data.")
    );
  }
});

router.get("/:id/groups", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      c.status(400);
      return c.json(badRequestResponse("Invalid user ID"));
    }

    const request = await fetch(
      `${GROUPS_API_URL}/users/${id}/groups/roles?includeLocked=true&includeNotificationPreferences=true`
    );
    const data = await request.json();
    const count = data.data.length;

    return c.json(successResponse({ count, groups: data.data }));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data.")
    );
  }
});

router.get("/:id/discord", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      c.status(400);
      return c.json(badRequestResponse("Invalid user ID"));
    }

    const data = await fetch(`${ROPRO_API_URL}?userid=${id}`).then((res) =>
      res.json()
    );

    return c.json(successResponse(data.discord));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data.")
    );
  }
});

router.get("/health", (c) => {
  return c.json(successResponse("API is healthy"));
});

export default router;
