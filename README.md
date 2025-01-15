# Following API

Simple API to fetch Roblox user following/follower information

## Endpoints

### GET /:id/following

Get users that the specified user follows (100 per page)

Response:

```json
{
  "success": true,
  "data": {
    "data": [...],
    "nextPageCursor": "string"
  }
}
```

### GET /:id/following/count

Get total count of users being followed

Response:

```json
{
  "success": true,
  "totalFollowing": 123
}
```

### GET /:id/followers

Get users following the specified user (100 per page)

Response:

```json
{
  "success": true,
  "data": {
    "data": [...],
    "nextPageCursor": "string"
  }
}
```

### GET /:id/followers/count

Get total follower count

Response:

```json
{
  "success": true,
  "totalFollowers": 123
}
```

### Error Response

```json
{
  "success": false,
  "error": "string"
}
```

### Status Codes

- `200`: Successful request
- `400`: "No user ID provided" or "Invalid user ID"
- `500`: "An error occurred while fetching the data"
