## TechBlog - A Modern Blogging Platform

### Overview

TechBlog is a modern blogging platform that allows users to create, manage, and explore blogs on various topics. Designed for seamless performance and a user-friendly experience, TechBlog is built using state-of-the-art technologies.

### Admin Credentials

````
  "email": "admin@email.com",
  "password": "admin123" 
````

### Features

#### User Features

- User Authentication: User registration and login.

- Create and Manage Blogs: Users can create, update, and delete their blogs.

- Search and Filter Blogs: Advanced search and filtering capabilities by title, content, or authorId.

- View Author Profiles: Display author details in blogs.

#### Admin Features

- Block Users: Admin can block any users.

- Blog Management: Admin can delete any blog.

### Technology Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- TypeScript
- Zod (Validation)

### Installation and Setup

- Clone the Repository

```
git clone https://github.com/thesanchitadevi/techblog.git
cd techblog
```

* Install Dependencies

```
npm install
```

* Configure Environment Variables
Create a ``.env`` file in the root directory and add the following:

```
NODE_ENV=development
PORT=5000
DATABASE_URL=
BYCRYPT_SALT=10
DEFAULT_PASS=#admin1234
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=
```

* Run the Development Server

```
npm run dev
````

### API Endpoints

#### Authentication

- POST `/api/auth/register` - Register a new user.

- POST `/api/auth/login` - User login.

#### Blog Management

- POST `/api/blogs` - Create a new blog.

- GET `/api/blogs` - Fetch all blogs with search and filters.

- PATCH `/api/blogs/:id` - Update user's own blog by ID.

- DELETE `/api/blogs/:id` - Delete user's own blog by ID.

#### Admin Actions

- PATCH `/api/admin/users/:userId/block` - Block a user.

- DELETE `/api/admin/blogs/:id` - Delete any blog.
