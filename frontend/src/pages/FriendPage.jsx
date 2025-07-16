import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { UsersIcon, MessageSquareIcon } from "lucide-react";

import useAuthUser from "../hooks/useAuthUser";
import { getUserFriends } from "../lib/api";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const { authUser } = useAuthUser();
  const navigate = useNavigate();

  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
    enabled: !!authUser,
  });

  const handleMessage = (friendId) => {
    navigate(`/chat/${friendId}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="card bg-base-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="card-body p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar size-16 rounded-full">
                      <img src={friend.profilePic} alt={friend.fullName} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{friend.fullName}</h3>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => handleMessage(friend._id)}
                  >
                    <MessageSquareIcon className="size-4 mr-2" />
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
