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
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
                flexDirection: "column",
            }}
        >
            {" "}
            <div style={{ fontSize: "30px", marginBottom: "30px" }}>
                My Gallery
            </div>
            <div class="gallery-cont">
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
