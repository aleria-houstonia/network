import React, { useContext, useEffect, useState } from "react";
import { commentContext } from "../../contexts/CommentContext";
import { useAuth } from "../../contexts/AuthContext";
import "./Comments.css";
import { Comment } from "semantic-ui-react";

const CommentsList = (props) => {
    const [editTask, setEditTask] = useState("");
    const { currentUser } = useAuth();
    const [editInputId, setEditInputId] = useState("");

    const { saveTopic, getComment, deleteComment, commentData } = useContext(
        commentContext
    );

    const getNewName = (e) => {
        setEditTask(e.target.value);
        setEditInputId(e.target.id);
    };

    useEffect(() => {
        getComment();
    }, []);
    const createNewArr = (index, id) => {
        const editedTask = {
            text: editTask,
            id: editInputId,
        };
        saveTopic(id, editedTask);
        getComment();
        document.querySelector("#k" + id).style.display = "none";
    };

    return (
        <ul>
            {commentData.map((item, index) => (
                <div className="comment__item">
                    {props.name == item.name ? (
                        <Comment>
                            <Comment.Content>
                                <Comment.Author
                                    as="a"
                                    style={{ color: "black", fontSize: "18px" }}
                                >
                                    {item.author}
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div style={{ fontSize: "14px" }}>
                                        {item.now}
                                    </div>
                                </Comment.Metadata>
                                <Comment.Text>{item.text}</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>
                                        {(currentUser &&
                                            currentUser.email === item.uid) ||
                                        (currentUser &&
                                            currentUser.uid ===
                                                "UBKmT34gMPQtgu0n2iitDamoqk43") ? (
                                            <div style={{ display: "flex" }}>
                                                {" "}
                                                <button
                                                    style={{
                                                        width: "50px",
                                                        marginRight: "7px",
                                                        borderRadius: "5px",
                                                    }}
                                                    className="delete-btn comment-buttons"
                                                    onClick={() =>
                                                        deleteComment(item.id)
                                                    }
                                                >
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                                <br />
                                                <button
                                                    style={{
                                                        fontSize: "12px",
                                                        width: "50px",
                                                        borderRadius: "5px",
                                                    }}
                                                    className="edit-btn comment-buttons"
                                                    onClick={(e) => {
                                                        document.querySelector(
                                                            `#k${item.id}`
                                                        ).style.display =
                                                            "block";
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        ) : null}{" "}
                                        <div>
                                            _________________________________
                                        </div>
                                    </Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    ) : null}

                    <div
                        id={"k" + item.id}
                        className="edit-input"
                        style={{ display: "none" }}
                    >
                        <input
                            className="inp-name"
                            id={item.id}
                            type="text"
                            onChange={getNewName}
                        />
                        <br />

                        <button
                            onClick={() => createNewArr(index, item.id)}
                            className="save-btn"
                        >
                            Save
                        </button>
                    </div>
                </div>
            ))}
        </ul>
    );
};

export default CommentsList;
