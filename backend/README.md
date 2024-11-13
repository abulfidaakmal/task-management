## Getting Started

### Installation

1. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file and add the following environment variables:

   ```plaintext
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CORS_ORIGIN=your_frontend_origin
   DATABASE_URL=your_database_url
   USER_ID=your_test_user_id
   ```

4. **Run Prisma migration and generate**:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Build the project:**:

   ```bash
   npm run build
   ```

6. **Start the App**:
   ```bash
   npm run start
   ```

---

## API Endpoints

- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task by its ID
- `PATCH /tasks/:id` - Update the status of a task by its ID
- `DELETE /tasks/:id` - Delete a task by its ID

> Note: Endpoints may require Clerk authentication tokens.
