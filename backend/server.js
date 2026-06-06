const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://she-can-foundation-five-delta.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

// ================= DATABASE =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) =>
    console.log("❌ MongoDB Connection Error:", err)
  );

// ================= MODEL =================

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  message: {
    type: String,
    required: true,
    minlength: 10,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.model("Form", formSchema);

// ================= ADMIN =================

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "mohit123";

// ================= AUTH =================

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      error: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

// ================= ROUTES =================

// Health Check
app.get("/", (req, res) => {
  res.json({
    message: "🌸 She Can Foundation API Running",
  });
});

// Submit Form
app.post("/api/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const newSubmission = await Form.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: newSubmission,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Server error",
    });
  }
});

// Admin Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  console.log("Login Attempt:", {
    username,
    password,
  });

  if (
    username !== ADMIN_USERNAME ||
    password !== ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      error: "Invalid username or password",
    });
  }

  const token = jwt.sign(
    {
      username,
      role: "admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({
    success: true,
    token,
    user: {
      username,
    },
  });
});

// Get All Submissions
app.get(
  "/api/submissions",
  protect,
  async (req, res) => {
    try {
      const submissions = await Form.find().sort({
        date: -1,
      });

      res.json(submissions);
    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: "Failed to fetch submissions",
      });
    }
  }
);

// Delete Submission
app.delete(
  "/api/submissions/:id",
  protect,
  async (req, res) => {
    try {
      const deleted = await Form.findByIdAndDelete(
        req.params.id
      );

      if (!deleted) {
        return res.status(404).json({
          error: "Submission not found",
        });
      }

      res.json({
        success: true,
        message: "Submission deleted successfully",
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: "Failed to delete submission",
      });
    }
  }
);

// ================= 404 =================

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// ================= ERROR HANDLER =================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal Server Error",
  });
});

// ================= START =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );

  console.log(
    "👤 Admin Login -> username: admin | password: mohit123"
  );
});
