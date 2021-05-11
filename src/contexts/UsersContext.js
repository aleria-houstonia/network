import axios from "axios";
import React, { useReducer } from "react";

export const userContext = React.createContext();

const INIT_STATE = {
    allUsers: [],
    resUsers: [],
    friend: {},
    likes: [],
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_USER":
            return { ...state, allUsers: action.payload };
        case "GET_SEARCH":
            return { ...state, resUsers: action.payload.data };
        case "GET_FRIENDS":
            return { ...state, friend: action.payload };
        case "GET_LIKE":
            return { ...state, likes: action.payload };
        default:
            return state;
    }
};

const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    function getUser(email, password, name) {
        let user = {
            name,
            email,
            password,
        };

        axios.post("http://localhost:8000/user", user);
    }
    async function renderUsers() {
        let { data } = await axios("http://localhost:8000/user");
        dispatch({
            type: "GET_USER",
            payload: data,
        });
    }
    async function getUsersRes(history) {
        const search = new URLSearchParams(history.location.search);
        history.push(`${history.location.pathname}?${search.toString()}`);
        let res = await axios.get(
            `http://localhost:8000/user${window.location.search}`
        );
        dispatch({
            type: "GET_SEARCH",
            payload: res,
        });
    }
    // -================================================================

    function addFriend(friend) {
        let friends = JSON.parse(localStorage.getItem("friends"));
        if (!friends) {
            friends = {
                posts: [],
            };
        }
        let newFriend = {
            item: friend,
        };

        let filteredFriend = friends.posts.filter(
            (elem) => elem.item.email === friend.email
        );
        if (filteredFriend.length > 0) {
            friends.posts.filter((elem) => elem.item.email !== friend.email);
        } else {
            friends.posts.push(newFriend);
        }

        localStorage.setItem("friends", JSON.stringify(friends));
    }
    function getFriend() {
        let friends = JSON.parse(localStorage.getItem("friends"));
        if (!friends) {
            friends = {
                posts: [],
            };
        }
        dispatch({
            type: "GET_FRIENDS",
            payload: friends,
        });
    }
    function deleteFriend(id) {
        let toDelete = JSON.parse(localStorage.getItem("friends"));
        toDelete.posts = toDelete.posts.filter((elem) => elem.item.id !== id);
        localStorage.setItem("friends", JSON.stringify(toDelete));
        getFriend();
    }
    // ======================================================================

    function getLikes(post, user) {
        let likes = JSON.parse(localStorage.getItem("likes"));
        console.log(likes);
        if (!likes) {
            likes = {
                posts: [],
            };
        }
        let newLike = {
            item: user,
            post: post,
        };

        let filteredLikes = likes.posts.filter((elem) => elem.post === post);
        if (filteredLikes.length > 0) {
            likes.posts.filter((elem) => elem.post !== post);
        } else {
            likes.posts.push(newLike);
        }

        localStorage.setItem("likes", JSON.stringify(likes));
    }

    function allLikes() {
        let likes = JSON.parse(localStorage.getItem("likes"));
        if (!likes) {
            likes = {
                posts: [],
            };
        }
        dispatch({
            type: "GET_LIKE",
            payload: likes,
        });
    }
    return (
        <userContext.Provider
            value={{
                getLikes,
                deleteFriend,
                getFriend,
                addFriend,
                getUser,
                renderUsers,
                allLikes,
                likes: state.likes,
                friend: state.friend,
                allUsers: state.allUsers,
                getUsersRes,
                resUsers: state.resUsers,
            }}
        >
            {children}
        </userContext.Provider>
    );
};
export default UserContextProvider;
