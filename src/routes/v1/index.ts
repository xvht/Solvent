import { Hono } from "hono";
import {
  calculateFinalScore,
  calculateScores,
  getConfidenceLevel,
  isUserVerified,
  THRESHOLDS,
  WEIGHTS,
} from "../../helpers/detection";
import { fetchCrsfToken, generateRandomBirthday } from "../../helpers/roblox";
import { getUserByUsername, getUserDetails } from "../../helpers/users";
import {
  badRequestResponse,
  serverErrorResponse,
  successResponse,
} from "../../responses";

const router = new Hono();

const ROPRO_API_URL = "https://api.ropro.io/getUserInfoTest.php";
const FRIENDS_API_URL = "https://friends.roblox.com/v1";
const GROUPS_API_URL = "https://groups.roblox.com/v1";

router.get("/", (c) => {
  c.status(400);
  return c.json(badRequestResponse("No user ID provided"));
});

router.get("/username/:username", async (c) => {
  try {
    const username = c.req.param("username");
    if (!username) {
      c.status(400);
      return c.json(badRequestResponse("Invalid username"));
    }

    const data = await getUserByUsername(username);
    if (!data) {
      return c.json(badRequestResponse("User not found"));
    }

    const userDetails = await getUserDetails(data.id);
    return c.json(successResponse({ ...data, ...userDetails }));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data")
    );
  }
});

router.get("/username/:username/validate", async (c) => {
  try {
    const username = c.req.param("username");
    if (!username) {
      c.status(400);
      return c.json(badRequestResponse("Invalid username"));
    }

    const crsfToken = (await fetchCrsfToken()) || "";
    if (!crsfToken) {
      c.status(500);
      return c.json(
        serverErrorResponse("An error occurred while fetching the CSRF token")
      );
    }

    const response = await fetch(
      "https://auth.roblox.com/v1/usernames/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-csrf-token": crsfToken,
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          Origin: "https://www.roblox.com",
          DNT: "1",
          "Sec-GPC": "1",
          Connection: "keep-alive",
          Referer: "https://www.roblox.com/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
          TE: "trailers",
        },
        cache: "no-cache",
        body: JSON.stringify({
          username,
          context: "Signup",
          birthday: generateRandomBirthday(),
        }),
      }
    ).then((res) => res.json());

    return c.json(successResponse(response)); // 0 = valid, 1 = taken, 2 = filtered
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data")
    );
  }
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
      serverErrorResponse("An error occurred while fetching the data")
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
      serverErrorResponse("An error occurred while fetching the data")
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
      serverErrorResponse("An error occurred while fetching the data")
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
      serverErrorResponse("An error occurred while fetching the data")
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
      serverErrorResponse("An error occurred while fetching the data")
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
      serverErrorResponse("An error occurred while fetching the data")
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
      `${GROUPS_API_URL}/users/${id}/groups/roles?includeLocked=true&includeNotificationPreferences=false`
    );
    const data = await request.json();

    const simplifiedGroups = data.data.map((item: any) => ({
      groupId: item.group.id,
      groupName: item.group.name,
      roleId: item.role.id,
      roleName: item.role.name,
      isPrimaryGroup: item.isPrimaryGroup || false,
      isOwnedGroup: item.group.owner.userId === id,
    }));

    return c.json(
      successResponse({
        count: data.data.length,
        groups: simplifiedGroups,
      })
    );
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data")
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
      serverErrorResponse("An error occurred while fetching the data")
    );
  }
});

router.get("/:id/alt", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      c.status(400);
      return c.json(badRequestResponse("Invalid user ID"));
    }

    const [
      baseUserDetails,
      friendsCount,
      followersCount,
      followingCount,
      groupsData,
      roproData,
      isEmailVerified,
    ] = await Promise.all([
      getUserDetails(id),
      fetch(`${FRIENDS_API_URL}/users/${id}/friends/count`).then((res) =>
        res.json()
      ),
      fetch(`${FRIENDS_API_URL}/users/${id}/followers/count`).then((res) =>
        res.json()
      ),
      fetch(`${FRIENDS_API_URL}/users/${id}/followings/count`).then((res) =>
        res.json()
      ),
      fetch(
        `${GROUPS_API_URL}/users/${id}/groups/roles?includeLocked=true&includeNotificationPreferences=false`
      ).then((res) => res.json()),
      fetch(`${ROPRO_API_URL}?userid=${id}`).then((res) => res.json()),
      isUserVerified(id),
    ]);

    const ownedGroupsCount = groupsData.data.filter(
      (group: any) => group.group.owner.userId === id
    ).length;

    const metrics = {
      friendsCount: friendsCount.count,
      followersCount: followersCount.count,
      followingCount: followingCount.count,
      groupsCount: groupsData.data.length,
      hasRoProDiscord: Boolean(roproData.discord),
      isEmailVerified,
      accountAge: Math.floor(
        (Date.now() -
          new Date(baseUserDetails?.created ?? new Date()).getTime()) /
          86400000
      ),
      hasVerifiedBadge: baseUserDetails?.hasVerifiedBadge ?? false,
      ownedGroupsCount,
    };

    const scores = calculateScores(metrics);
    const finalScore = calculateFinalScore(scores);
    const confidenceExplanation = getConfidenceLevel(scores, metrics);

    const response = {
      score: finalScore,
      details: {
        scores,
        metrics,
        thresholds: THRESHOLDS,
        weights: WEIGHTS,
      },
      interpretation: {
        likelihood:
          finalScore < 0.3 ? "low" : finalScore < 0.7 ? "moderate" : "high",
        explanation: confidenceExplanation,
      },
    };

    return c.json(successResponse(response));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data")
    );
  }
});

router.get("/:id/is-verified", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id || isNaN(id)) {
      c.status(400);
      return c.json(badRequestResponse("Invalid user ID"));
    }

    const isVerified = await isUserVerified(id);
    return c.json(successResponse(isVerified));
  } catch (error) {
    c.status(500);
    return c.json(
      serverErrorResponse("An error occurred while fetching the data")
    );
  }
});

router.get("/health", (c) => {
  return c.json(successResponse("API is healthy"));
});

export default router;
