import { TextField } from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import { commentContext } from "../../contexts/CommentContext";
import { useAuth } from "../../contexts/AuthContext";
import "./Comments.css";
import { userInfoContext } from "../../contexts/UserInfoContext";
import { userContext } from "../../contexts/UsersContext";
const CommentsAdd = (props) => {
    const { currentUser } = useAuth();
    const { postNewComment, getComment } = useContext(commentContext);
    const { userInfoData } = useContext(userInfoContext);
    // const { allUsers, renderUsers } = useContext(userContext);
    const [com, setCom] = useState({
        text: "",
        author: "",
    });

    const handleValues = (e) => {
        let newComment = {
            ...com,
            text: e.target.value,
            author: currentUser.email,
            uid: currentUser.email,
            now: new Date().toLocaleString(),
            name: props.name,
        };
        setCom(newComment);
    };
    const sendComment = () => {
        postNewComment(com);
        getComment();
        setCom({
            text: "",
        });
    };
    return (
        <div className="form__btn">
            <Form reply>
                <TextField
                    style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        borderRadius: "5px",
                    }}
                    variant={"outlined"}
                    fullWidth
                    rowsMax={2}
                    value={com.text}
                    onChange={(e) => handleValues(e)}
                />

                <Button
                    className="comment-button"
                    onClick={sendComment}
                    content="Add Comment"
                    labelPosition="left"
                    icon="edit"
                    primary
                />
            </Form>
        </div>
    );
};

export default CommentsAdd;
