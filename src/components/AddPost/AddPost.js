import { Container } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { postContext } from "../../contexts/PostContext";
import { userInfoContext } from "../../contexts/UserInfoContext";
import "./Addpost.css";
const AddPost = ({ history }) => {
    const [post, setPost] = useState({ description: "", image: "" });
    const { currentUser } = useAuth();
    const { addNewPost, getPost } = useContext(postContext);
    const { userInfoData } = useContext(userInfoContext);
    const handleValues = (e) => {
        let newPost = {
            ...post,
            [e.target.name]: e.target.value,
            secondId: currentUser.email,
            uid: currentUser.uid,
            date: new Date().toLocaleString(),
            name: userInfoData.name,
            like: [],
            view: [],
        };
        setPost(newPost);
    };
    const handleAdd = () => {
        addNewPost(post, history);
        getPost(history);
        setPost({ description: "", image: "" });
    };
    return (
        <Container
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {" "}
            <div className="add">
                <div className="title-add">Add New Post</div>
                <input
                    className="inp-add inp"
                    type="text"
                    name="image"
                    onChange={handleValues}
                    placeholder="image"
                />
                <textarea
                    name="description"
                    onChange={handleValues}
                    placeholder="description"
                    type="text"
                    className="inp-add textarea"
                ></textarea>
                {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
                <button style={{ width: "100px" }} onClick={handleAdd}>
                    Add
                </button>
                {/* </div> */}
            </div>
        </Container>
    );
};

export default AddPost;
