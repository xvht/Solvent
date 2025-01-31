# **Solvent**

API to fetch Roblox user relationship information (friends, followers, following)

> [!NOTE]
>
> - All endpoints that fetch lists of users handle pagination automatically (100 items per page)
> - The API internally concatenates all pages to return complete results
> - User ID must be a valid number

## **Endpoints**

### **GET /v1/**

Returns an error if no user ID is provided

```json
{
  "error": true,
  "code": 400,
  "data": "No user ID provided"
}
```

### **GET /v1/:id/friends**

Get all friends of the specified user

```json
{
  "error": false,
  "code": 200,
  "data": [...]
}
```

### **GET /v1/:id/friends/count**

Get total friend count

```json
{
  "error": false,
  "code": 200,
  "data": 123
}
```

### **GET /v1/:id/following**

Get all users that the specified user follows

```json
{
  "error": false,
  "code": 200,
  "data": [...]
}
```

### **GET /v1/:id/following/count**

Get total count of users being followed

```json
{
  "error": false,
  "code": 200,
  "data": 123
}
```

### **GET /v1/:id/followers**

Get users following the specified user

```json
{
  "error": false,
  "code": 200,
  "data": [...]
}
```

### **GET /v1/:id/followers/count**

Get total follower count

```json
{
  "error": false,
  "code": 200,
  "data": 123
}
```

### **GET /v1/:id/groups**

Get all groups the specified user is in

```json
{
  "error": false,
  "code": 200,
  "data": {
    "count": 123,
    "groups": [...]
  }
}
```

### **GET /v1/:id/discord**

Get the Discord username of the specified user

```json
{
  "error": false,
  "code": 200,
  "data": "discord_username_here"
}
```

### **GET /v1/:id/is-verified**

Check if the specified user's roblox email is verified

```json
{
  "error": false,
  "code": 200,
  "data": true
}
```

### **GET /v1/username/:username**

Resolve a Roblox username to user data

```json
{
  "error": false,
  "code": 200,
  {
    "requestedUsername": "roblox",
    "hasVerifiedBadge": true,
    "id": 1,
		"name": "Roblox",
		"displayName": "Roblox",
    "description": "...",
    "created": "2006-02-27T21:06:40.3Z",
    "isBanned": false,
    "externalAppDisplayName": null
  }
}
```

### **GET /v1/:id/alt**

Returns algorithm output to detect if the user is an alt account or not

Example output:

```json
{
  "error": false,
  "code": 200,
  "data": {
    "score": 0.65,
    "details": {
      "scores": {
        "friends": 0.4,
        "followers": 1,
        "following": 1,
        "groups": 0.6,
        "verification": 0.2,
        "ropro": 0.8
      },
      "metrics": {
        "friendsCount": 9,
        "followersCount": 0,
        "followingCount": 0,
        "groupsCount": 4,
        "hasRoProDiscord": false,
        "isEmailVerified": true
      },
      "thresholds": {
        "friends": {
          "low": 5,
          "moderate": 15
        },
        "followers": {
          "low": 3,
          "moderate": 10
        },
        "following": {
          "low": 3,
          "moderate": 10
        },
        "groups": {
          "low": 3,
          "moderate": 10
        }
      },
      "weights": {
        "friends": 0.25,
        "followers": 0.2,
        "following": 0.15,
        "groups": 0.15,
        "verification": 0.15,
        "ropro": 0.1
      }
    },
    "interpretation": {
      "likelihood": "moderate",
      "explanation": "Based on social activity, this may be an alt account. The account has very few followers, and follows very few users."
    }
  }
}
```

### **GET /v1/health**

Check the health of the API

```json
{
  "error": false,
  "code": 200,
  "data": "API is healthy"
}
```

### **Error Responses**

#### Bad Request (400)

```json
{
  "error": true,
  "code": 400,
  "data": "Invalid user ID"
}
```

#### Server Error (500)

```json
{
  "error": true,
  "code": 500,
  "data": "An error occurred while fetching the data"
}
```
