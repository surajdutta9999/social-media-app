import { setMessages } from "@/redux/chatSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessage = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.auth);

    useEffect(() => {
        if (!selectedUser?._id) return;
        const source = axios.CancelToken.source();

        const fetchAllMessage = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/message/all/${selectedUser._id}`, {
                    withCredentials: true,
                    cancelToken: source.token
                });
                if (res.data.success) {  
                    dispatch(setMessages(res.data.messages));
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled", error.message);
                } else {
                    console.error("Error fetching messages:", error);
                }
            }
        };

        fetchAllMessage();

        return () => {
            source.cancel("Operation canceled by the user.");
        };
    }, [selectedUser, dispatch]);
};

export default useGetAllMessage;
