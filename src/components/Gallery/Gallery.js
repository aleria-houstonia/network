import React, { useContext, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { postContext } from "../../contexts/PostContext";
import { userContext } from "../../contexts/UsersContext";
import "./Gallery.css";
// {postData
//     .map((item) => (
//         <div>
//             {currentUser &&
//             currentUser.email == item.secondId ? (
const Gallery = () => {
    const { getPost, postData } = useContext(postContext);
    const { currentUser } = useAuth();
    useEffect(() => {
        getPost();
    }, []);
    return (
        <div
            style={{
                // minHeight: "100vh",
                display: "flex",
                flexWrap: "wrap",
                // width: "600px",
            }}
        >
            <div class="grid-container">
                {postData.map((item) => (
                    <>
                        {currentUser && currentUser.email == item.secondId ? (
                            <div>
                                <img
                                    class="grid-item grid-item-10"
                                    src={item.image}
                                    alt=""
                                />
                                <p>{item.description}</p>
                            </div>
                        ) : null}
                    </>
                ))}
            </div>
            ;
        </div>
    );
};

export default Gallery;
