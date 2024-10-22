const jwt = require("jsonwebtoken");
// Secret key used for signing and verifying JWTs
const secretKey = process.env.JWT_SECRET ?? "jwt-secret"; // Replace this with a strong secret key in production

// Function to generate a JWT
function generateJWT(user) {
  // JWT payload containing user information
  const payload = {
    id: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
}

// Function to verify a JWT
function verifyJWT(token) {
  try {
    // Verify the JWT using the secret key
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    // If the token is invalid or expired, an error will be thrown
    console.error("JWT verification failed:", err.message);
    return null;
  }
}

module.exports = { generateJWT, verifyJWT };
