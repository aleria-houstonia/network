import axios from "axios";
import React, { useReducer } from "react";

export const userInfoContext = React.createContext();

const INIT_STATE = {
    userInfoData: {},
    friendData: {},
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_USER_INFO":
            return { ...state, userInfoData: action.payload };
        case "GET_FRIEND_INFO":
            return { ...state, friendData: action.payload };
        default:
            return state;
    }
};
const UserInfoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    const postUserInfo = (info, his) => {
        axios.post("http://localhost:8000/userInfo", info);
        getInfo(his);
    };
    const getInfo = async (id) => {
        let { data } = await axios.get(`http://localhost:8000/userInfo/${id}`);

        dispatch({
            type: "GET_USER_INFO",
            payload: data,
        });
    };
    const editInfo = async (id, newDesc) => {
        await axios.patch(`http://localhost:8000/userInfo/${id}`, newDesc);
        getInfo(id);
    };

    async function getFriendsInfo(id) {
        let { data } = await axios.get(`http://localhost:8000/userInfo/${id}`);

        dispatch({
            type: "GET_FRIEND_INFO",
            payload: data,
        });
    }
    return (
        <userInfoContext.Provider
            value={{
                userInfoData: state.userInfoData,
                friendData: state.friendData,
                getFriendsInfo,
                postUserInfo,
                getInfo,
                editInfo,
            }}
        >
            {children}
        </userInfoContext.Provider>
    );
};
export default UserInfoContextProvider;
