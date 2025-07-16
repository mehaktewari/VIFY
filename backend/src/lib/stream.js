import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("Stream credentials missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const generateStreamToken = (userId) => {
  try {
    if (!userId) throw new Error("User ID required");
    return streamClient.createToken(userId);
  } catch (error) {
    console.error("Token generation failed:", error);
    throw error;
  }
};

export const upsertStreamUser = async (userData) => {
  try {
    return await streamClient.upsertUser({
      id: userData.id,
      name: userData.name,
      image: userData.image,
    });
  } catch (error) {
    console.error("User upsert failed:", error);
    throw error;
  }
};