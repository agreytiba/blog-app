const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const commentRoute = require("./routes/comments");
const multer = require("multer");
const path = require("path");
const cors =require("cors")


app.use(cors())
// running port
const port = process.env.PORT || 5000;

// allow to access env file
dotenv.config();

// express body parser(allow to access "req.body")
app.use(express.json());

// images middleware
app.use("/images", express.static(path.join(__dirname, "/images")));

// connecting to mongoDb database using mongoose
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  // multer for handling images storage and verification
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// routes middleware
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comment", commentRoute);

// listening port
app.listen(port, () => {
  console.log(`server is running on port ${port}` );
});
