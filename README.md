# **Solvent**

API to fetch Roblox user relationship information (friends, followers, following)

## **Endpoints**

### **GET /**

Returns an error if no user ID is provided

```json
{
  "success": false,
  "error": "No user ID provided"
}
```

### **GET /:id/friends**

Get all friends of the specified user

```json
{
  "error": false,
  "code": 200,
  "data": [...]
}
```

### **GET /:id/friends/count**

Get total friend count

```json
{
  "error": false,
  "code": 200,
  "data": 123
}
```

### **GET /:id/following**

Get all users that the specified user follows

```json
{
  "error": false,
  "code": 200,
  "data": [...]
}
```

### **GET /:id/following/count**

Get total count of users being followed

```json
{
  "error": false,
  "code": 200,
  "data": 123
}
```

### **GET /:id/followers**

Get users following the specified user

```json
{
  "error": false,
  "code": 200,
  "data": [...]
}
```

### **GET /:id/followers/count**

Get total follower count

```json
{
  "error": false,
  "code": 200,
  "data": 123
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

## **Notes**

> [!NOTE]
>
> - All endpoints that fetch lists of users handle pagination automatically (100 items per page)
> - The API internally concatenates all pages to return complete results
> - User ID must be a valid number
