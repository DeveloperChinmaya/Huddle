const JWT_SECRET = process.env.JWT_SECRET
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("🔹 Received Token:", token); // ✅ Debug log

  if (!token) return res.status(401).json({ error: "Unauthorized. Please log in." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Decoded User:", decoded); // ✅ Debug log
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Token Verification Error:", error); // ✅ Debug log
    res.status(401).json({ error: "Invalid token. Please log in again." });
  }
};