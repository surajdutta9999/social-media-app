import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get('https://social-media-app-5ay6.onrender.com/api/v1/post/all', { withCredentials: true });
                if (res.data.success) { 
                    dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchAllPost();
    }, [dispatch]);
};

export default useGetAllPost;
