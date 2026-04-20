import jwt from "jsonwebtoken";

export async function authUser(req, res, next) {
  // captures token from incoming req
  // checks if its a legit token created on this server using jwt_secret
  // if its legit, get the user data used to create it, save it to decoded variable
  // pass on user's data by adding a property to req; req.user

  const { token } = req.cookies;
  console.log("authUser middleware ran", token);

  if (!token) {
    return res.status(400).json({
      message: "invalid credentials",
      succes: false,
      err: err.message,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(400).json({
      message: "cannot fetch logged-in user",
      succes: false,
      err: err.message,
    });
  }
}
