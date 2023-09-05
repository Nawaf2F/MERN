const router = require("express").Router();
const Doctor = require("../model/doctor.js");
const Report = require("../model/report.js");
const config = require("../config/config.js");
const jwt = require("jwt-simple");
const passport = require("passport");
const multer = require("multer");
const path = require("path");

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Store uploaded images in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Route for uploading an image
router.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = req.file.path;
  console.log("Image URL: ", imageUrl);
  const relativeImagePath = path.relative("./uploads", imageUrl);
  console.log("Relative Image Path: ", relativeImagePath);
  // You can save the image URL in a database or use it as needed
  res.json({ message: "Image uploaded successfully", url: relativeImagePath });
});

// Route for fetching reports
router.get("/getReports", async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Error fetching reports" });
  }
});
// Define a middleware function to verify the JWT token
const verifyToken = (req, res, next) => {
  console.log("==============================================");
  console.log("Req.headers: ", req.headers);
  const token =
    req.headers.authorization &&
    req.headers.authorization.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Decode the token using jwt-simple and your secret key
    const decoded = jwt.decode(token, config.jwtSecret);
    console.log("Decoded: ", decoded);
    // Attach the decoded user information to the request object
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Create a new report
router.post("/createReport", verifyToken, (req, res) => {
  const { patientName, patientID, classification, description, image } =
    req.body;
  console.log(req.body);
  console.log("Req.user for report: ", req.user.user.username);

  // Create a new Report instance
  const newReport = new Report({
    patientName,
    patientID,
    classification,
    description,
    doctor: req.user.user._id, // Assuming you're using authentication and the doctor's ID is available in req.user
    image,
  });

  // Save the new report to the database
  newReport
    .save()
    .then((report) => {
      res.json(report); // Return the created report data as response
    })
    .catch((error) => {
      console.error("Error creating report:", error);
      res.status(500).json({ error: "Failed to create report" });
    });
});

// get all users
router.get("/getUsers", (req, res) => {
  Doctor.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

// register
router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const doctorType = req.body.doctorType;

  Doctor.register(
    new Doctor({ username: username, DoctorType: doctorType }),
    password,
    function (err, msg) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
});

router.post("/doctor/login", passport.authenticate("local"), (req, res) => {
  console.log(req.user);
  console.log(req.body.username);

  const user = Doctor.findOne({ username: req.body.username })
    .then(() => {
      var payload = {
        user: req.user,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
      };
      console.log("Payload: ", payload);
      var token = jwt.encode(payload, config.jwtSecret);
      console.log("Token: ", token);
      res.json({ token: token });
    })

    .catch((err) => console.log(err));
});

// Apply the verifyToken middleware to the /home route
router.get("/home", verifyToken, (req, res) => {
  // The user information is available in req.user
  console.log("Req.user: ", req.user.user.username);
  const username = req.user.user.username;
  console.log("Username: ", username);
  res.json({
    message: `Welcome, ${username}! You made it to the secured profile.`,
  });
});

//logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
});

// delete
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Doctor.findByIdAndDelete(id)
    .then(() => res.json({ message: "User deleted successfully" }))
    .catch((err) => res.send(500, err));
});

// update
router.put("/update/:id", (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body; // Assuming you're sending the updated data in the request body
  const updatedUser = Doctor.findByIdAndUpdate(userId, updatedData, {
    new: true,
  })
    .then(() => res.json(updatedUser))
    .catch((err) => res.send(500, err));
});

// edit
router.get("/update/:id", (req, res) => {
  const userId = req.params.id;
  Doctor.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
    });
});

// index
router.get("/", (req, res) => {
  res.render("index");
});

// create new
router.get("/new", (req, res) => {});

// create
router.post("/new", (req, res) => {});

module.exports = router;
