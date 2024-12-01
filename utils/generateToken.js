import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  }); //params are payload, secret and expiration length. We are using the userId as the payload but we could include more in the object like the user name as in the jwt.io website example

  //Set JWT as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    // secure: false, //for testing prodction mode on other PCs
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days in Milliseconds
  });
};

export default generateToken;
