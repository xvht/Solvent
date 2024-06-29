# FollowingAPI

This is a simple proxy API that allows you to fetch the followers of a given Roblox user.

It is built using [Hono](https://hono.dev/) and Roblox's API.

## Usage

To use this API, you need to send a GET request to the following endpoint:

```
https://following.kty.lol/{userId}
```

Where `{userId}` is the ID of the user you want to fetch the last 100 followers of the user in ascending order.

This will return a JSON object with the following structure:

```json
{
  "success": true,
  "data": {
    "previousPageCursor": null,
    "nextPageCursor": null,
    "data": [
      {
        "isDeleted": false,
        "friendFrequentScore": 0,
        "friendFrequentRank": 201,
        "hasVerifiedBadge": false,
        "description": null,
        "created": "0001-01-01T05:51:00Z",
        "isBanned": false,
        "externalAppDisplayName": null,
        "id": 1234567890,
        "name": "user1",
        "displayName": "User One"
      },
      {
        "isDeleted": false,
        "friendFrequentScore": 0,
        "friendFrequentRank": 201,
        "hasVerifiedBadge": false,
        "description": null,
        "created": "0001-01-01T05:51:00Z",
        "isBanned": false,
        "externalAppDisplayName": null,
        "id": 0987654321,
        "name": "user2",
        "displayName": "User Two"
      }
    ]
  }
}
```

If no user ID is passed, the API will return a 400 Bad Request error.

```json
{
  "success": false,
  "error": "No user ID provided"
}
```

If a malformed user ID is passed, the API will return a 400 Bad Request error.

```json
{
  "success": false,
  "error": "Invalid user ID"
}
```
