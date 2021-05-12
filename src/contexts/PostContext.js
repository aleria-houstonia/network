import axios from "axios";
import React, { useReducer, useState } from "react";
import { useHistory } from "react-router";

export const postContext = React.createContext();

const INIT_STATE = {
    postData: [],
    postSave: {},
    postPageData: [],
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_POST_PAGE":
            return {
                ...state,
                postPageData: action.payload.data,
            };
        case "GET_POST":
            return {
                ...state,
                postData: action.payload,
            };
        case "GET_POST_SAVE":
            return { ...state, postSave: action.payload };
        default:
            return state;
    }
};
const PostContextProvider = ({ children }) => {
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    const [limit, setLimit] = useState(1);
    const addNewPost = (post) => {
        axios.post("http://localhost:8000/post", post);
        getPost();
    };
    const getPostPagination = async (history) => {
        const search = new URLSearchParams(history.location.search);
        history.push(`${history.location.pathname}?${search.toString()}`);

        let adress = "http://localhost:8000/post?";
        adress = adress + `${window.location.search}&_limit=${limit}`;
        let arr = adress.split("??");
        let test = arr.join("?");

        let res = await axios(test);

        console.log(window.location.search);

        dispatch({
            type: "GET_POST_PAGE",
            payload: res,
        });
    };
    async function getPost() {
        let { data } = await axios("http://localhost:8000/post");
        dispatch({
            type: "GET_POST",
            payload: data,
        });
    }
    const deletePost = async (id, history) => {
        await axios.delete(`http://localhost:8000/post/${id}`);
        getPost();
    };

    function addProductToSave(product) {
        let post = JSON.parse(localStorage.getItem("post"));
        if (!post) {
            post = {
                posts: [],
            };
        }
        let newPost = {
            item: product,
        };

        let filteredPost = post.posts.filter(
            (elem) => elem.item.id === product.id
        );
        if (filteredPost.length > 0) {
            post.posts.filter((elem) => elem.item.id !== product.id);
        } else {
            post.posts.push(newPost);
        }

        localStorage.setItem("post", JSON.stringify(post));
    }
    function getPostSave() {
        let post = JSON.parse(localStorage.getItem("post"));
        if (!post) {
            post = {
                posts: [],
            };
        }
        dispatch({
            type: "GET_POST_SAVE",
            payload: post,
        });
    }
    function checkProductInCart(id) {
        let post = JSON.parse(localStorage.getItem("post"));
        if (!post) {
            post = {
                posts: [],
            };
        }
        let newPost = post.posts.filter((elem) => elem.item.id === id);
        return newPost.length > 0 ? true : false;
    }
    function deleteCartProducts(id) {
        let toDelete = JSON.parse(localStorage.getItem("post"));
        toDelete.posts = toDelete.posts.filter((elem) => elem.item.id !== id);
        localStorage.setItem("post", JSON.stringify(toDelete));
        getPostSave();
    }
    async function loadMore() {
        let resPag = await axios.get(`http://localhost:8000/post`);
        if (limit < resPag.data.length) setLimit(limit + 1);
        console.log(resPag.data.length);
        console.log(limit);
    }

    // =========================================================

    async function editPost(id, newObj) {
        await axios.patch(`http://localhost:8000/post/${id}`, newObj);
        getPost();
    }

    function getAlarm(post, user) {
        let newObj = {
            post,
            user,
        };
        axios.post(`http://localhost:8000/alarm`, newObj);
    }
    return (
        <postContext.Provider
            value={{
                getAlarm,
                loadMore,
                editPost,
                limit: limit,
                setLimit: setLimit,
                addNewPost,
                getPost,
                getPostPagination,
                deletePost,
                addProductToSave,
                getPostSave,
                checkProductInCart,
                deleteCartProducts,

                postSave: state.postSave,
                postPageData: state.postPageData,
                postData: state.postData,
            }}
        >
            {children}
        </postContext.Provider>
    );
};
export default PostContextProvider;
