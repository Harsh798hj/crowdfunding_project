# Crowdfunding Platform

## 🚀 Overview
This is a web-based **Crowdfunding Platform** that allows users to create and support fundraising campaigns. The platform enables secure transactions, campaign tracking, and user authentication.

## 🔥 Features
- 🏆 **Create and Manage Campaigns**
- 💰 **Make Secure Donations**
- 📊 **Track Campaign Progress**
- 🔐 **User Authentication & Authorization**
- 📩 **Email Notifications**
- 📱 **Responsive UI with React**

## 🛠 Tech Stack
### **Frontend:**
- React.js (Vite)
- Tailwind CSS
- Axios (for API calls)

### **Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Multer (for file uploads)

## 🏗 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Harsh798hj/Crowdfunding_platform.git
cd Crowdfunding_platform
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install
```
Create a `.env` file inside `backend/` and add:
```
MONGO_URI=mongodb://localhost:27017/crowdfunding
PORT=4000
JWT_SECRET=your_secret_key
```
Then, start the backend server:
```sh
npm start
```

### **3️⃣ Frontend Setup**
```sh
cd ../frontend
npm install
npm run dev
```

## 🧩 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | User login |
| `GET` | `/api/campaigns` | Fetch all campaigns |
| `POST` | `/api/campaigns` | Create a new campaign |
| `POST` | `/api/donations` | Donate to a campaign |

## 🎯 Contribution
Feel free to contribute! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License.

---
### **💡 Have Suggestions or Issues?**
Open an [issue](https://github.com/Harsh798hj/Crowdfunding_platform/issues) or reach out! 😊

