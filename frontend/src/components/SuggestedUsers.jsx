import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { setSuggestedUsers } from "@/redux/authSlice";

const SuggestedUsers = () => {
  const dispatch = useDispatch();
  const isFollowing = false;
  // const [suggestedUsers, setSuggestedUsers] = useState();
  const { suggestedUsers } = useSelector((store) => store.auth);

  const handleFollow = async (user_id) => {
    try {
      const action = isFollowing ? "Unfollow" : "follow";
      const response = await axios.post(
        `https://social-media-app-kyme.onrender.com/api/v1/user/followOrUnfollow/${user_id}/${action}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        const updatedUsers = suggestedUsers.map((user) =>
          user._id === userId ? { ...user, isFollowing: true } : user
        );
        dispatch(setSuggestedUsers(updatedUsers));
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  if (!suggestedUsers || suggestedUsers.length === 0) {
    return (
      <p className="text-gray-600">No suggestions available at the moment.</p>
    );
  }

  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer">See All</span>
      </div>
      {suggestedUsers.map((user) => {
        return (
          <div
            key={user._id}
            className="flex items-center justify-between my-5"
          >
            <div className="flex items-center gap-2">
              <Link to={`/profile/${user?._id}`}>
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt="post_image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h1 className="font-semibold text-sm">
                  <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
                </h1>
                <span className="text-gray-600 text-sm">
                  {user?.bio || "Bio here..."}
                </span>
              </div>
            </div>
            <button
              className={`text-xs font-bold cursor-pointer ${
                user.isFollowing
                  ? "text-gray-400"
                  : "text-[#3BADF8] hover:text-[#3495d6]"
              }`}
              onClick={() => handleFollow(user._id)}
              disabled={user.isFollowing}
            >
              {user.isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
