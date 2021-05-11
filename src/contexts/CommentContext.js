import axios from "axios";
import React, { useReducer } from "react";

export const commentContext = React.createContext();

const INIT_STATE = {
    commentData: [],
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_COMMENT":
            return { ...state, commentData: action.payload };
        default:
            return state;
    }
};
const CommentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    function postNewComment(comment) {
        axios.post("http://localhost:8000/comments", comment);
        getComment();
    }
    async function getComment() {
        let { data } = await axios("http://localhost:8000/comments");
        dispatch({
            type: "GET_COMMENT",
            payload: data,
        });
    }
    async function deleteComment(id) {
        await axios.delete(`http://localhost:8000/comments/${id}`);
        getComment();
    }
    async function saveTopic(id, newComment) {
        axios.patch(`http://localhost:8000/comments/${id}`, newComment);
        getComment();
    }
    return (
        <commentContext.Provider
            value={{
                commentData: state.commentData,
                saveTopic,
                getComment,
                postNewComment,
                deleteComment,
            }}
        >
            {children}
        </commentContext.Provider>
    );
};
export default CommentContextProvider;
