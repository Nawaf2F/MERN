const express = require("express");
const session = require("express-session");
const router = require("./route/routes.js");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const Doctor = require("./model/doctor.js");
const Report = require("./model/report.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const allowedOrigins = [
  "http://localhost:27017",
  "http://127.0.0.1:27017",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://192.168.1.106:3000",
  "http://192.168.1.106:27017",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Configure express-session middleware
app.use(
  session({
    secret: "Nawaf-key", // Change this to a secure secret key
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 15 },
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

//passport local strategy
passport.use(
  new LocalStrategy(Doctor.authenticate(), {
    model: Doctor,
  })
);

//passport serialize and deserialize
passport.serializeUser(Doctor.serializeUser());
passport.deserializeUser(Doctor.deserializeUser());

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Nawaf-key", // Replace with your actual secret key
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  Doctor.findById(payload.id)
    .then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((error) => {
      console.error(error);
      done(error);
    });
});

passport.use(jwtStrategy);

app.use(express.static("uploads"));

// middleware router
app.use("/", router);

// setting port
if (process.env.NODE_ENV === "test") {
  app.set("port", 27017);
} else {
  app.set("port", process.env.PORT || 27017);
}

// setting server
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")} 🚀`);
});
