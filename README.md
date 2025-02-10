# DevTinder

DevTinder is a matchmaking platform for developers, allowing them to connect based on their skills and interests.

## 🚀 Features
- User authentication with JWT
- Secure password hashing with bcrypt
- Connection requests between users
- User profile management
- RESTful API with Express.js

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT, bcrypt

## 📦 Installation
```sh
# Clone the repository
git clone https://github.com/yourusername/DevTinder.git

# Navigate to the project directory
cd DevTinder

# Install dependencies
npm install

# Start the development server
npm start
```

## 🔑 Environment Variables
Create a `.env` file and configure the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=7777
```

## 📌 API Endpoints
### User Authentication
- **POST** `/users` - Register a new user
- **POST** `/login` - Login user and receive JWT token
- **GET** `/profile` - Fetch logged-in user profile

### User Actions
- **POST** `/sendConnectionRequestToUsers` - Send a connection request
- **GET** `/users` - Retrieve all users
- **PATCH** `/users/:userId` - Update user profile
- **DELETE** `/user` - Delete a user

## 🤝 Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License.

---

**Author:** Ansh Tyagi
**GitHub:** [ANSHTYAGI7](https://github.com/yourusername)
