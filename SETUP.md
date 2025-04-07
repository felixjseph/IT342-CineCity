## Setup

## Prerequisites

### 🖥 Frontend
1. **React + Vite** – Modern frontend framework for high-speed UI
2. **React Router DOM** – Page routing
3. **TailwindCSS / Custom CSS** – Responsive and clean design

### ⚙️ Backend
1. **Spring Boot** – REST API framework for Java
2. **Spring Security + JWT** – For secure authentication and authorization
3. **PayMongo API** – Online payment integration (GCash, credit cards, etc.)
4. **MySQL (via Workbench)** – Relational database
5. **JPA / Hibernate** – ORM for DB interaction

### Cloning & Running The Project

```bash
git clone https://github.com/felixjseph/IT342-CineCity.git
```
### **Setup Springboot**

1. Navigate to Backend Directory Folder (cinemabs)
```
cd ../cinemabs
```

2. Properly set up the env file in the backend root directory:
```
DATABASE_URL=jdbc:
DB_USER=root
DB_PASSWORD=

JWT_SECRET_KEY=
PAYMONGO_API_SECRET_KEY=
PAYMONGO_PAYMENT_INTENT=
PAYMONGO_PAYMENT_METHOD=
```

3. Run the backend
```
./mvnw spring-boot:run
```
or 
```
run the Application.java
```

### **Setup React +Vite Environment**

1. Navigate to the frontend folder
```
cd ../cinecity-frontend
```

2. Install dependencies
```
npm i
```
3. Run the Frontend
```
npm run dev
```
