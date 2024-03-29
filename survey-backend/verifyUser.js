const fs = require("fs");
const jwt = require("jsonwebtoken");

const verifyUser = async (req) => {
  if (!process.env.SONICREM_NET) return "admin";
  try {
    const user = await jwt.verify(
      req.headers.authorization,
      fs.readFileSync(process.env.KEY_PATH).toString()
    );
    return user.username;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = verifyUser;
