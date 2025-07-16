import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id.toString();
    const token = generateStreamToken(userId);

    if (!token) {
      return res.status(500).json({ message: "Failed to generate token" });
    }

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Token generation error:", error);
    return res.status(500).json({ 
      message: error.message || "Internal server error" 
    });
  }
}