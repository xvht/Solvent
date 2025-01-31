export type RobloxUserResult = {
  requestedUsername: string;
  hasVerifiedBadge: boolean;
  id: number;
  name: string;
  displayName: string;
};

export type RobloxUserDetails = {
  description: string;
  created: string;
  isBanned: boolean;
  externalAppDisplayName: string | null;
  hasVerifiedBadge: boolean;
  id: number;
  name: string;
  displayName: string;
};

const USERNAME_URL = "https://users.roblox.com/v1/usernames/users";
const USER_DETAILS_URL = "https://users.roblox.com/v1/users";

/**
 * Get the user ID from a username
 * @param username - The username of the Roblox user
 * @returns The user ID if found, otherwise null
 */
export async function getUserByUsername(
  username: string
): Promise<RobloxUserResult | null> {
  try {
    const payload = {
      usernames: [username],
      excludeBannedUsers: false,
    };

    const response = (await fetch(USERNAME_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())) as { data: RobloxUserResult[] };

    if (!Array.isArray(response.data) || !response.data[0]) {
      return null;
    }

    return response.data[0];
  } catch (error) {
    console.error(`Error fetching user by username: ${error}`);
    return null;
  }
}

export async function getUserDetails(
  userId: number
): Promise<RobloxUserDetails | null> {
  try {
    const response = (await fetch(`${USER_DETAILS_URL}/${userId}`).then((res) =>
      res.json()
    )) as RobloxUserDetails;

    return response;
  } catch (error) {
    console.error(`Error fetching user details: ${error}`);
    return null;
  }
}
