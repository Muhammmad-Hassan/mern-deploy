const express = require('express');
const port = process.env.PORT || 5004; // Use process.env.PORT for dynamic port or default to 5004
const cors = require('cors');
const userRouter = require('./router/users');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
