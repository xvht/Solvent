# **Solvent API Documentation**

API to fetch Roblox user relationship information, group details, verification status, game server data, and perform username lookups and alt account analysis.

> [!IMPORTANT]
>
> - All endpoints returning lists of users (friends, followers, following) automatically handle pagination internally and return the complete results.
> - User IDs (`:id`) must be valid positive integers.
> - Usernames (`:username`) are case-insensitive but must correspond to an existing Roblox account.
> - Game IDs (`:gameId`) must be valid Roblox Place IDs.

## **Base URL**

All API endpoints are prefixed with `/v1`.

Example: `https://your-api-domain.com/v1/health`

## **Common Response Format**

All responses follow a consistent JSON structure:

```json
{
  "error": false,
  "code": 200,
  "data": {}
}
```

- `error`: Boolean indicating whether the request was successful (`false`) or failed (`true`).
- `code`: HTTP status code.
- `data`: The response data.

---

## **Endpoints**

### **GET `/v1/health`**

Check the health status of the API.

#### Response

```json
{
  "error": false,
  "code": 200,
  "data": "API is healthy"
}
```

---

### **GET `/v1/username/:username`**

Fetch user details by username.

#### Parameters

- `:username` (string): The Roblox username.

#### Response

```json
{
  "error": false,
  "code": 200,
  "data": {
    "id": 123456,
    "name": "username",
    "displayName": "Display Name",
    "description": "User description",
    "created": "2020-01-01T00:00:00.000Z",
    "hasVerifiedBadge": true
  }
}
```

---

### **GET `/v1/username/:username/validate`**

Validate the availability of a username.

#### Parameters

- `:username` (string): The Roblox username to validate.

#### Response

```json
{
  "error": false,
  "code": 200,
  "data": {
    "code": 0,
    "message": "Valid username"
  }
}
```

---

### **GET `/v1/:id/friends`**

Fetch the list of friends for a user.

#### Parameters

- `:id` (integer): The Roblox user ID.

#### Response

```json
{
  "error": false,
  "code": 200,
  "data": [
    {
      "id": 123456,
      "name": "Friend1",
      "displayName": "Friend Display Name"
    }
  ]
}
```

---

### **GET `/v1/:id/friends/count`**

Fetch the count of friends for a user.

#### Parameters

- `:id` (integer): The Roblox user ID.

#### Response

```json
{
  "error": false,
  "code": 200,
  "data": 10
}
```

---

### **GET `/v1/:id/following`**

Fetch the list of users the specified user is following.

#### Parameters

- `:id` (integer): The Roblox user ID.

#### Response

```json
{
  "error": false,
  "code": 200,
  "data": [
    {
      "id": 123456,
      "name": "Following1",
      "displayName": "Following Display Name"
    }
  ]
}
```

---

### **GET `/v1/:id/following/count`**

Fetch the count of users the specified user is following.

#### Parameters

- `:id` (integer): The Roblox user ID.

#### Response

```json
{
  "error": false,
  "code": 200,
  "data": 5
}
```

---

### **GET `/v1/:id/followers`**

Fetch the list of followers for a user.

#### Parameters

- `:id` (integer): The Roblox user ID.

#### Response

```json
{
  "error": false,
  "code": 200,
  "data": [
    {
      "id": 123456,
      "name": "Follower1",
      "displayName": "Follower Display Name"
    }
  ]
}
```

---

### **GET `/v1/:id/followers/count`**

Fetch the count of followers for a user.

#### Parameters

- `:id` (integer): The Roblox user ID.

#### Response

```json
{
  "error": false,
  "code": 200,
  "data": 15
}
```

---

### **GET `/v1/:id/groups`**

Fetch the list of groups the user is part of.

#### Parameters

- `:id` (integer): The Roblox user ID.

#### Response

```json
{
  "error": false,
  "code": 200,
  "data": {
    "count": 3,
    "groups": [
      {
        "groupId": 123,
        "groupName": "Group Name",
        "roleId": 456,
        "roleName": "Role Name",
        "isPrimaryGroup": false,
        "isOwnedGroup": true
      }
    ]
  }
}
```

---

### **GET `/v1/:id/discord`**

Fetch the Discord account linked to the user's RoPro profile.

#### Parameters

- `:id` (integer): The Roblox user ID.

#### Response

```json
{
  "error": false,
  "code": 200,
  "data": "Discord#1234"
}
```

---

### **GET `/v1/:id/alt`**

Analyze whether the user is likely an alt account.

#### Parameters

- `:id` (integer): The Roblox user ID.

#### Response

```json
{
  "error": false,
  "code": 200,
  "data": {
    "score": 0.75,
    "details": {
      "scores": {
        "friends": 0.2,
        "followers": 0.3,
        "following": 0.4,
        "groups": 0.5,
        "verification": 0.1,
        "ropro": 0.2,
        "accountAge": 0.3,
        "verifiedBadge": 0.1,
        "ownedGroups": 0.2
      },
      "metrics": {
        "friendsCount": 10,
        "followersCount": 5,
        "followingCount": 3,
        "groupsCount": 2,
        "hasRoProDiscord": true,
        "isEmailVerified": true,
        "accountAge": 365,
        "hasVerifiedBadge": true,
        "ownedGroupsCount": 1
      },
      "thresholds": {
        "friends": { "low": 5, "moderate": 15 },
        "followers": { "low": 3, "moderate": 10 },
        "following": { "low": 3, "moderate": 10 },
        "groups": { "low": 3, "moderate": 10 },
        "accountAge": { "low": 30, "moderate": 180 }
      },
      "weights": {
        "friends": 0.15,
        "followers": 0.1,
        "following": 0.1,
        "groups": 0.1,
        "verification": 0.15,
        "ropro": 0.1,
        "accountAge": 0.15,
        "verifiedBadge": 0.1,
        "ownedGroups": 0.05
      }
    },
    "interpretation": {
      "likelihood": "high",
      "explanation": "Based on account age, verification status, and group participation, this is likely not an alt account."
    }
  }
}
```

---

### **GET `/v1/:id/is-verified`**

Check if the user has a verified email.

#### Parameters

- `:id` (integer): The Roblox user ID.

#### Response

```json
{
  "error": false,
  "code": 200,
  "data": true
}
```

---

Retrieves a list of public servers for a given game's Place ID.

`GET /v1/servers/:gameId`

**Path Parameters:**

- `:gameId` (integer): The Roblox Place ID.

**Query Parameters:**

-   `sortOrder` (string, optional): Sort order for servers. `Asc` or `Desc`. Defaults to `Desc`.
-   `limit` (number, optional): Max number of servers to return. Allowed values: `10`, `25`, `50`, `100`. Defaults to `10`.
-   `excludeFullGames` (boolean, optional): Whether to exclude full servers. `true` or `false`. Defaults to `true`.

**Success Response (200 OK):**
```json
[
  {
    "id": "123456789",
    "maxPlayers": 10,
    "playing": 8,
    "fps": 60,
    "ping": 100,
    "location": "US",
    "vipServerId": null
  },
  {
    "id": "987654321",
    "maxPlayers": 15,
    "playing": 15,
    "fps": 45,
    "ping": 150,
    "location": "EU",
    "vipServerId": null
  }
]
```