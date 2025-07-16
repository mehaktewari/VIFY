import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser, isLoading: authLoading } = useAuthUser();

  const { data: tokenData, isLoading: tokenLoading, error: tokenError } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    if (!authUser || !tokenData?.token || !authUser._id) return;

    const initChat = async () => {
      try {
        // Initialize new client
        const client = new StreamChat(STREAM_API_KEY);
        
        // Connect user
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        // Create or get channel
        const channelId = [authUser._id, targetUserId].sort().join("-");
        const channel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });
        
        await channel.watch();

        setChatClient(client);
        setChannel(channel);
      } catch (error) {
        console.error("Chat initialization error:", {
          message: error.message,
          code: error.code,
          status: error.status,
        });
        toast.error(`Chat failed: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      if (chatClient) {
        chatClient.disconnectUser().catch(console.warn);
      }
    };
  }, [authUser, tokenData, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });
      toast.success("Video call link sent!");
    }
  };

  if (authLoading || tokenLoading || loading) return <ChatLoader />;
  if (!authUser) return <div className="text-red-500 p-4 text-center">⚠️ User not authenticated.</div>;
  if (tokenError) return <div className="text-red-500 p-4 text-center">⚠️ Failed to get Stream token.</div>;
  if (!chatClient) return <div className="text-red-500 p-4 text-center">⚠️ Chat client not initialized.</div>;
  if (!channel) return <div className="text-red-500 p-4 text-center">⚠️ Channel not available.</div>;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <Window>
            <div className="relative">
              <div className="absolute right-2 top-2 z-10">
                <CallButton handleVideoCall={handleVideoCall} />
              </div>
              <ChannelHeader />
            </div>
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;