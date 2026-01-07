import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = process.env;
  //   check if JWT_SECRET is defined
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", //  https only in prod to secure cookies
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", //  works locally to prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
