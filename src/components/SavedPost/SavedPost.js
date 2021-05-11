import React, { useContext, useEffect } from "react";
import { postContext } from "../../contexts/PostContext";
import PostCard from "../Post/PostCard";

const SavedPost = () => {
    const { getPostSave, postSave } = useContext(postContext);
    useEffect(() => {
        getPostSave();
    }, []);
    return (
        <div>
            {postSave.posts ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    {postSave.posts.map((item) => (
                        <div style={{ marginTop: "20px" }}>
                            <PostCard item={item.item} />
                        </div>
                    ))}
                </div>
            ) : (
                "save something"
            )}
        </div>
    );
};

export default SavedPost;
