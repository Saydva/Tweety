# Tweety Backend

This is the backend part of the Tweety project, built with NestJS and MongoDB.

## How to run

1. **Clone the repository**  
   If you haven't already, clone the project and navigate to the backend folder:
   ```bash
   git clone <your-repo-url>
   cd Tweety/nest_server
   ```

2. **Install dependencies**  
   Install all required packages:
   ```bash
   npm install
   ```
  
3. **Set up environment variables**  
   Create a `.env` file in the `nest_server` folder with the following content (edit as needed):
   ```
   MONGODB_URI=mongodb://localhost:27017/tweety
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1h
   REFRESH_TOKEN_EXPIRES_IN=7d
   PORT=4000
   ```

4. **API will be available at**  
   [http://localhost:4000](http://localhost:4000)

## Notes

- Make sure MongoDB is running locally or update `MONGODB_URI` to your MongoDB instance.
- The backend provides authentication and tweet APIs for the frontend.
- You can test the API using tools like Postman or REST Client.

---

Enjoy using

