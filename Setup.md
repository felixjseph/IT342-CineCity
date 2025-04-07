## Setup

### Prerequisites

Node.js (LTS version 20 or higher)

- Check your version by running:
```bash
node --version
```

### 🖥 Frontend
- **React + Vite** – Modern frontend framework for high-speed UI
- **React Router DOM** – Page routing
- **TailwindCSS / Custom CSS** – Responsive and clean design

### ⚙️ Backend
- **Spring Boot** – REST API framework for Java
- **Spring Security + JWT** – For secure authentication and authorization
- **PayMongo API** – Online payment integration (GCash, credit cards, etc.)
- **MySQL (via Workbench)** – Relational database
- **JPA / Hibernate** – ORM for DB interaction

---

### 📁 Project Structure

---

### ⚙️ Backend Setup (Spring Boot)

1. **Clone the repository**
```bash
git clone https://github.com/felixjseph/IT342-CineCity.git
cd cinecity/cinecity-backend
```

2. **Setup Springboot**
```
##Navigate to Backend Directory Folder (cinemabs)

cd ../cinemabs

##Properly set up the env file in the backend root directory:

DATABASE_URL=jdbc:
DB_USER=root
DB_PASSWORD=

JWT_SECRET_KEY=
PAYMONGO_API_SECRET_KEY=
PAYMONGO_PAYMENT_INTENT=
PAYMONGO_PAYMENT_METHOD=

##Run the backend

./mvnw spring-boot:run

or

run the Application.java
```

3. **Setup React +Vite Environment**

```
##Navigate to the frontend folder

cd ../cinecity-frontend


##Install dependencies

npm install
npm install toastify

##Run the Frontend

npm run dev