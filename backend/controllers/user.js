const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { User } = require("../models");
require("dotenv").config();

// Default admin for development stage - UPDATED to use async/await
(async function createDefaultAdmin() {
  try {
    const results = await db.User.find();
    const count = results.length;

    if (count == 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash("abc", salt);
      
      const user = new db.User({
        email: "imt_2018109@iiitm.ac.in",
        password: hash,
        isVerified: true,
      });

      await user.save();
      console.log("Default admin created successfully");
    }
  } catch (err) {
    console.error("Error creating default admin:", err);
  }
})();

//-------------------------------------------------------------------------------------------------------
// Validating email address and domain
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    //Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
    if (
      email.indexOf("@iiitm.ac.in", email.length - "@iiitm.ac.in".length) !== -1
    ) {
      //VALID
      //console.log("VALID");
      return true;
    }
  }
  return false;
}
//-------------------------------------------------------------------------------------------------------

// UPDATED to use async/await
const addAdmin = async (req, res) => {
  const userData = req.body;
  /* Validating Sign up Form */
  if (!userData.email || !userData.password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    //check for existing user account
    const foundUser = await db.User.findOne({ email: userData.email });

    if (!validateEmail(userData.email))
      return res.status(400).json({
        message: "You can only add admins having email of iiitm.ac.in domain",
      });

    //return error if account already exist
    if (foundUser)
      return res.status(400).json({
        message: "Email is already been registered.",
      });

    //if doesn't exist, we generate hash Salt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userData.password, salt);

    const { email } = req.body;
    const newUser = {
      email: email,
      password: hash,
    };

    const createdUser = await db.User.create(newUser);

    // Create JWT
    jwt.sign(
      { foo: createdUser._id },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "10h" },
      (err, jwt) => {
        if (err)
          return res.status(403).json({
            message: "Access forbidden",
          });
        
        res.status(200).json({
          message: "Admin added successfully.",
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, Please try again",
      error: err.message
    });
  }
};

// Rest of the code remains the same but I'd recommend updating other methods too

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Please enter both your email and password",
    });
  }

  try {
    const foundUser = await db.User.findOne({ email: req.body.email });

    if (!validateEmail(req.body.email))
      return res.status(400).json({
        message: "Please login with email of iiitm.ac.in domain",
      });

    if (!foundUser) {
      return res.status(400).json({
        message:
          "Email address is not associated with any account. Please check and try again",
      });
    }

    // check password match
    const isMatch = await bcrypt.compare(req.body.password, foundUser.password);

    if (isMatch) {
      /* jwt */
      jwt.sign(
        { foo: foundUser._id, email: foundUser.email },
        `${process.env.JWT_SECRET}`,
        { expiresIn: "10h" },
        (err, jwt) => {
          if (err)
            return res.status(403).json({
              message: "Access Forbidden",
            });
          res.status(200).json({ jwt, userId: foundUser._id });
        }
      );
    } else {
      return res.status(400).json({
        message: "Email or Password is not correct.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong. Please try again",
      error: err.message
    });
  }
};

const create = async (req, res) => {
  // const user = req.curUserId;
  const campaign = { ...req.body, raised: 0 };

  if (!campaign.title || !campaign.description || !campaign.subTitle) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (campaign.required <= 0) {
    return res.status(400).json({
      message: "The required amount cannot be equal to or smaller than 0",
    });
  }

  try {
    const newCampaign = await db.Campaign.create(campaign);
    res.status(200).json(newCampaign);
  } catch (err) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong when creating a new campaign",
    });
  }
};

const options = {
  // Return the document after updates are applied
  new: true,
  // Create a document if one isn't found. Required
  // for `setDefaultsOnInsert`
  upsert: true,
  setDefaultsOnInsert: true,
};

const update = async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      let updatedCampaign = await db.Campaign.findByIdAndUpdate(
        req.params.id,
        req.body,
        options
      );
      res.status(200).json(updatedCampaign);
    } else {
      res.status(404).json({
        message: "No such campaign exists.",
      });
    }
  } catch (err) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong while updating campaign. Try again.",
    });
  }
};

const deleteCampaign = async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      await db.Campaign.findByIdAndRemove(req.params.id);
      return res.status(200).json({
        message: "Successfully deleted the campaign.",
      });
    } else {
      res.status(404).json({
        message: "No such campaign exists.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while deleting campaign. Try again.",
    });
  }
};

module.exports = {
  addAdmin,
  //verify,
  //resend,
  login,
  //forgotPassword,
  //resetPassword,
  create,
  update,
  deleteCampaign,
};