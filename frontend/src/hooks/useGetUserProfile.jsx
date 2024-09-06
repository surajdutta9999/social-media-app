import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const memoizedDispatch = useMemo(() => dispatch, [dispatch]);

  useEffect(() => {
    if (!userId) return;

    const source = axios.CancelToken.source();
    
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Fetching user profile...");
        const res = await axios.get(
          `https://social-media-app-5ay6.onrender.com/api/v1/user/${userId}/profile`,
          {
            withCredentials: true,
            cancelToken: source.token,
          }
        );
        if (res.data.success) {
          console.log("User profile fetched successfully:", res.data.user);
          memoizedDispatch(setUserProfile(res.data.user));
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          console.error("Error fetching user profile:", err);
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [userId, memoizedDispatch]);

  return { isLoading, error };
};

export default useGetUserProfile;
