import { Container } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { postContext } from "../../contexts/PostContext";
import { userInfoContext } from "../../contexts/UserInfoContext";
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
            <div
                style={{
                    maxWidth: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <div>New Post</div>
                <input
                    type="text"
                    name="image"
                    onChange={handleValues}
                    placeholder="image"
                    style={{
                        width: "500px",
                        height: "50px",
                        textAlign: "center",
                        fontSize: "15px",
                    }}
                />
                <textarea
                    name="description"
                    onChange={handleValues}
                    placeholder="description"
                    type="text"
                    style={{
                        margin: "10px 0",
                        width: "500px",
                        height: "150px",
                        textAlign: "center",
                        fontSize: "15px",
                    }}
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
