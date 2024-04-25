const express = require("express");

const db = require('../db')
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Ankushisag@@db*y";

// Create a new participant using /createuser api. Login not required
router.post('/createuser', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  let data = `select * from participants where USN='${req.body.USN}';`
  try {

    db.query(data,async (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).send("Internal server error");
      }
      if (result.length > 0)
        return res
          .status(400)
          .json({ success: false, error: "Sorry, user with this USN already exists" });

      else {
        const { PName, USN, Phone, Sex, Branch, Sem, Email, Password } = req.body;
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(Password, salt);
        let sql = `Insert into participants values ('${PName}','${USN}',${Phone},'${Sex}','${Branch}',${Sem},'${Email}','${secPass}','P')`
        try {
          db.query(sql, async(err, result) => {
            if (err) {
              console.log(err)
              return res.status(500).send("Internal server error");
            }
            const data = {
              user: {
                id: USN,
              },
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ success: true, authToken });
          })
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal server error");
        }
      }
    })

  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
});



// Login an existing participant using /login api.
router.post('/login', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const UserType = req.body.UserType;
    let key, sql;
    if (UserType === "F") {
      key = req.body.SSN;
      sql = `Select * from faculty where SSN='${key}';`
    }
    else if (UserType === "SC") {
      key = req.body.USN;
      sql = `Select * from student_coordinator where USN='${key}';`
    }
    else {
      key = req.body.USN;
      sql = `Select * from participants where USN='${key}';`
    }

    const Password = req.body.Password

    db.query(sql, async (err, user) => {
      if (err) {
        console.log(err)
        return res.status(500).send("Internal server error");
      }
      console.log(user)
      if (!user[0]) {
        console.log(user)
        return res
          .status(400)
          .json({ success: false, error: "Please enter valid credentials" });
      }
      const passCompare = await bcrypt.compare(Password, user[0].Password);
      if (!passCompare)
        return res
          .status(400)
          .json({ success: false, error: "Please enter valid credentials" });
      const data = {
        user: {
          id: key,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // res.json(user)
      res.json({ success: true, authToken });
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

});

module.exports = router;