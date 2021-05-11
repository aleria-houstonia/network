import React, { useContext, useEffect, useState } from "react";
import { userInfoContext } from "../../contexts/UserInfoContext";
import { useAuth } from "../../contexts/AuthContext";
import "./UserPage.css";
import { postContext } from "../../contexts/PostContext";
import PostCard from "../Post/PostCard";
import { userContext } from "../../contexts/UsersContext";
// <i class="fas fa-user-plus"></i>

const UserPage = ({ history }) => {
    const { userInfoData, editInfo, getInfo } = useContext(userInfoContext);
    const { getPost, postData } = useContext(postContext);
    const [editState, setEditState] = useState({});
    const [editStatus, setEditStatus] = useState(false);
    const { currentUser } = useAuth();
    const { getFriend, friend, resUsers, getUsersRes } = useContext(
        userContext
    );
    useEffect(() => {
        getPost();
        getFriend();
        getInfo(currentUser.email);
    }, []);

    function handleValue(e) {
        let edit = {
            ...editState,
            [e.target.name]: e.target.value,
        };
        setEditState(edit);
        console.log(edit);
    }
    function handleSave() {
        setEditStatus(false);

        editInfo(currentUser.email, editState);
    }
    function addFunc() {
        {
            history.push("/addinfouser");
        }
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <>
                {currentUser && currentUser.email == userInfoData.id ? (
                    <>
                        {editStatus ? (
                            <div className="main-user-desc-edit">
                                <div className="main-user-edit">
                                    <textarea
                                        className="userpage-edit"
                                        name="name"
                                        onChange={handleValue}
                                        placeholder="name"
                                        type="text"
                                    >
                                        {userInfoData.name}
                                    </textarea>
                                    <textarea
                                        className="userpage-edit"
                                        name="status"
                                        onChange={handleValue}
                                        placeholder="status"
                                        type="text"
                                    >
                                        {userInfoData.status}
                                    </textarea>
                                    <textarea
                                        className="userpage-edit"
                                        name="birthday"
                                        onChange={handleValue}
                                        placeholder="birthday"
                                        type="text"
                                    >
                                        {userInfoData.birthday}
                                    </textarea>
                                    <textarea
                                        className="userpage-edit"
                                        name="city"
                                        onChange={handleValue}
                                        placeholder="city"
                                        type="text"
                                    >
                                        {userInfoData.city}
                                    </textarea>
                                    <textarea
                                        className="userpage-edit"
                                        name="education"
                                        onChange={handleValue}
                                        placeholder="education"
                                        type="text"
                                    >
                                        {userInfoData.education}
                                    </textarea>
                                    <textarea
                                        name="image"
                                        onChange={handleValue}
                                        placeholder="image"
                                        type="text"
                                    >
                                        {userInfoData.image}
                                    </textarea>
                                    <button
                                        className="save-edit"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="user-info">
                                    <div className="bio">
                                        <div className="user-image">
                                            <img src={userInfoData.image} />
                                        </div>
                                        <div className="user-info-main">
                                            <div className="user-name main-desc">
                                                {userInfoData.name}
                                            </div>
                                            <div className="user-status  main-desc">
                                                {userInfoData.status}
                                            </div>
                                            <div className="user-info-second">
                                                <div className="user-birth  main-desc">
                                                    День рождения:{" "}
                                                    {userInfoData.birthday}
                                                </div>
                                                <div className="user-city  main-desc">
                                                    Город: {userInfoData.city}
                                                </div>
                                                <div className="user-edu  main-desc">
                                                    Образование:{" "}
                                                    {userInfoData.education}
                                                </div>
                                            </div>
                                            {userInfoData ? (
                                                <button
                                                    onClick={() => {
                                                        setEditStatus(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            ) : (
                                                <button onClick={addFunc}>
                                                    Add
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="user-active">
                                    <div className="user-active-container">
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <div style={{ fontSize: "25px" }}>
                                                {friend?.posts.length}{" "}
                                            </div>
                                            <div>
                                                <i class="fas fa-user-friends"></i>{" "}
                                                friends{" "}
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => {
                                                history.push("/gallery");
                                            }}
                                        >
                                            <i class="fas fa-images"></i>
                                            images
                                        </div>
                                        <div>
                                            <i class="fas fa-heart"></i>
                                            likes
                                        </div>
                                        <div>
                                            <i class="fas fa-headphones-alt"></i>
                                            music
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {" "}
                        {/* <p>{currentUser.email}</p> */}
                        <button onClick={addFunc}>Add</button>
                    </>
                )}
                <div
                    className="user-history"
                    style={{
                        display: "flex",
                        justifyContent: "center",

                        flexWrap: "wrap",
                        width: "500px",
                    }}
                >
                    {postData
                        .map((item) => (
                            <div>
                                {currentUser &&
                                currentUser.email == item.secondId ? (
                                    <div className="card-page">
                                        <PostCard item={item} />
                                    </div>
                                ) : null}
                            </div>
                        ))
                        .reverse()}
                </div>
                <button onClick={() => window.scrollTo(0, 0)}>back</button>
            </>
        </div>
    );
};

export default UserPage;
