const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const dotenv = require("dotenv").config();
const colors = require("colors");
const errorHandler = require("./middlewares/errorHandler");

PORT = process.env.PORT || 5002;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/employers", require("./routes/employerRoutes"));
app.use("/employees", require("./routes/employeeRoutes"));
app.use("/forgot-pass", require("./routes/forgotPass"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/contact", require("./routes/constactUs"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please Activate Production"));
}

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
