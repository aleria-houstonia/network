import React, { useReducer, useState } from "react";
import { firestore } from "../helpers/base";
import firebase from "firebase";
import axios from "axios";
export const messageContext = React.createContext();

const INIT_STATE = {
    messageData: [],
    chatData: {},
    chatid: [],
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_MESSAGE":
            return { ...state, chatid: action.payload };
        default:
            return state;
    }
};

const MessageContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    const [chat, setChat] = useState([]);
    const getId = (chatId, text, curUser, user) => {
        if (!chat.arr) {
            let newObj = {
                ...chat,
                id: chatId,
                arr: [text],
                currentUser: curUser,
                user: user,
            };
            localStorage.setItem("id", JSON.stringify(newObj));
            setChat(newObj);
        } else {
            let newObj = {
                ...chat,
                id: chatId,
                arr: [...chat.arr, text],
                currentUser: curUser,
                user: user,
            };
            setChat(newObj);
            localStorage.setItem("id", JSON.stringify(newObj));
        }
        fetchMessage();
    };

    function fetchMessage() {
        let id = JSON.parse(localStorage.getItem("id"));
        if (!id) {
            id = {
                arr: [],
            };
        }
        dispatch({
            type: "GET_MESSAGE",
            payload: id,
        });
    }

    return (
        <messageContext.Provider
            value={{
                fetchMessage,
                getId,
                postMessage,
                chatid: state.chatid,
            }}
        >
            {children}
        </messageContext.Provider>
    );
};
export default MessageContextProvider;

// function getMessages(id) {
//     let messages = JSON.parse(localStorage.getItem("messages"));
//     console.log(messages);
//     if (!messages) {
//         messages = {
//             chats: [],
//         };
//     }
//     let newLike = {
//         id: id,
//         chat: [],
//     };

//     let filteredLikes = messages.chats.filter((elem) => elem.id === id);
//     if (filteredLikes.length > 0) {
//         messages.chats.filter((elem) => elem.id !== id);
//     } else {
//         messages.chats.push(newLike);
//     }

//     localStorage.setItem("messages", JSON.stringify(messages));
// }

// function allLikes() {
//     let messages = JSON.parse(localStorage.getItem("messages"));
//     if (!messages) {
//         messages = {
//             posts: [],
//         };
//     }
//     dispatch({
//         type: "GET_LIKE",
//         payload: messages,
//     });
// }

// ===========================================
// let id = JSON.parse(localStorage.getItem("id"));
// if (!id) {
//     id = {
//         ids: [],
//     };
// }
// let newId = {
//     id: chatId,
//     chat: [].push(text),
// };

// let filteredFriend = id.ids.filter((elem) => elem.id.id === chatId);
// if (filteredFriend.length > 0) {
//     id.ids.filter((elem) => elem.ids.id !== chatId);
// } else {
//     id.ids.push(newId);
// }

// localStorage.setItem("id", JSON.stringify(id));

// const postMessage = (id) => {
//     axios.post("http://localhost:8000/messages", id);
//     getMessage();
// };
// const getChat = async (id) => {
//     let { data } = await axios.get(`http://localhost:8000/messages/${id}`);

//     dispatch({
//         type: "GET_CHAT",
//         payload: data,
//     });
// };
// const getMessage = async () => {
//     let { data } = await axios("http://localhost:8000/messages");
//     dispatch({
//         type: "GET_MESSAGE",
//         payload: data,
//     });
// };
