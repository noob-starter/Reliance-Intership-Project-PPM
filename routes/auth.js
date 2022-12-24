import { Router as expressRouter } from "express";

import { User } from "../models/User";

import bcrypt from "bcryptjs";
const router = expressRouter();
/*
 @route     GET /test
 @desc      Test for the auth route working
 @access    Public
*/
router.get("/test", async (req, res) => {
  res.send(`Authentication routes are working...   `);
});

/*
 @route     GET /register
 @desc      Test for the Registration route working
 @access    Public
*/
router.get("/register", async (req, res) => {
  res.send(`Welcome register here...   `);
});

/*
 @route     GET /login
 @desc      Test for the Login route working
 @access    Public
*/
router.get("/login", async (req, res) => {
  res.send(`Welcome login here...   `);
});

/*
 @route     POST /register
 @desc      Creating a new user and saving it Database
 @access    Public
*/
router.post("/register", async (req, res) => {
  try {
    // Getting the contents of User from the body
    const { name, email, password } = req.body;

    // If the user is already registered then show 'already registered' else create a new user
    await User.findOne({ email: email }, (err, user) => {
      if (user) {
        res.send({ message: `Already Registered` });
      } else {
        const user = req.body;

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hashed) => {
            user.password = hashed;
            const newUser = new User(user);
            try {
              newUser.save();
              res.status(201).json(newUser);
            } catch (error) {
              res.status(409).json({ message: error.message });
            }
          });
        });
      }
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

router.post("/resetpassword", async (req, res) => {
  try {
    // If the user is already registered then show 'already registered' else create a new user
    var { email, password } = req.body;

    await User.findOneAndUpdate({ email: email }, { password: password })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
    res.status(201).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

/*
 @route     POST /login
 @desc      Checking the Login Details for a User
 @access    Public
*/
router.post("/login", async (req, res) => {
  try {
    // Getting the contents of user email (as username) and password from the body
    const { email, password } = req.body;

    // If the user is already registered then proceed for password authentication else print not register
    User.findOne({ email: email }, async (err, user) => {
      if (user) {
        // Validating the hashed password
        // const hashed = bcrypt.hashSync(password, bcrypt.genSaltSync()
        const comparePassword = async (password, hash) => {
          try {
            return await bcrypt.compare(password, hash);
          } catch (error) {
            console.log(error);
          }

          // Return false if error
          return false;
        };
        const boolReturn = await comparePassword(password, user.password);
        if (boolReturn) {
          res.send({ user });
        } else {
          res.send({ message: `Password didn't match` });
        }
      } else {
        res.send({ message: `User not registered` });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// Exporting the routes for login and register
export const authRoute = router;
