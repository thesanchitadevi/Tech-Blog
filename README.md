## TechBlog

### Overview

The TechBlog backend server is a RESTful API built using Node.js, Express, and TypeScript, with MongoDB as the database. It serves as the core of the TechBlog application, providing endpoints for user authentication, blog management, and admin functionalities. Designed for scalability and security, this server ensures smooth communication between the frontend and the database.

### Admin Credentials

```
{
  "email": "admin@email.com",
  "password": "admin123"
}
```

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

- Install Dependencies

```
npm install
```

- Configure Environment Variables
  Create a `.env` file in the root directory and add the following:

```
NODE_ENV=development
PORT=5000
DATABASE_URL=
BYCRYPT_SALT=10
DEFAULT_PASS=#admin1234
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=
```

- Run the Development Server

```
npm run dev
```

The application will run on `http://localhost:5000`

### API Endpoints

#### Authentication

- POST `/api/auth/register` - Register a new user.

- POST `/api/auth/login` - User login.

#### Blog Management

- POST `/api/blogs` - Create a new blog.

- GET `/api/blogs` - Fetch all blogs with search and filters.

- PATCH `/api/blogs/:id` - Update a blog owned by the user.

- DELETE `/api/blogs/:id` - Delete a blog owned by the user.

#### Admin Actions

- PATCH `/api/admin/users/:userId/block` - Block a user.

- DELETE `/api/admin/blogs/:id` - Delete any blog.

### Project Structure

The `src` directory contains the following subdirectories and files:

- `app.ts`: Initializes the Express application and configures middleware.
- `server.ts`: Starts the server and listens on the specified port.
- `app`: Contains the main application logic.
  - `builder`: Contains query building details for the application.
  - `config`: Contains configuration files for the application.
  - `errors`: Contains error files or the application.
  - `middlewares`: Contains all middlewares files or the application.
  - `modules`: Contains the different modules of the application.
    - `auth`: Contains the authentication module.
    - `blog`: Contains the blog module.
    - `user`: Contains the user module
  - `routes`: Contains all router files or the application.

### Conclusion

Thank you for exploring TechBlog!
