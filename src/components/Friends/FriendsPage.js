import React, { useContext, useEffect, useState } from "react";
import { userInfoContext } from "../../contexts/UserInfoContext";
import { postContext } from "../../contexts/PostContext";
import PostCard from "../Post/PostCard";
// <i class="fas fa-user-plus"></i>
import "./Friends.css";
import { useAuth } from "../../contexts/AuthContext";
import { messageContext } from "../../contexts/MessageContext";
import Message from "../Message/Message";
const FriendsPage = ({ history }) => {
    const { userInfoData, friendData } = useContext(userInfoContext);
    const { getPost, postData } = useContext(postContext);
    const { currentUser } = useAuth();
    const { postMessage, getMessage } = useContext(messageContext);
    const [messageArea, setMessageArea] = useState(false);
    useEffect(() => {
        getPost(history);
        // getMessage();
    }, []);

    const [messId, setMessId] = useState("");

    function makeId(current, toUser) {
        let chatId = [current, toUser]
            .sort((a, b) => a.localeCompare(b))
            .join(" ");
        setMessId(chatId);
        setMessageArea(true);
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
            {friendData.id == userInfoData.id ? (
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
                                        День рождения: {userInfoData.birthday}
                                    </div>
                                    <div className="user-city  main-desc">
                                        Город: {userInfoData.city}
                                    </div>
                                    <div className="user-edu  main-desc">
                                        Образование: {userInfoData.education}
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        makeId(
                                            currentUser.email,
                                            userInfoData.id
                                        )
                                    }
                                    className="btn-1"
                                >
                                    Написать
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                "jirjgiejgiohfhhhhhhhhhhhhhhhhhhhhhhhhhh"
            )}{" "}
            {messageArea ? (
                <div>
                    <Message
                        id={messId}
                        current={currentUser.email}
                        toUser={userInfoData.id}
                    />
                </div>
            ) : null}
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
                            {friendData.id == item.secondId ? (
                                <div className="card-page">
                                    <PostCard item={item} />
                                </div>
                            ) : null}
                        </div>
                    ))
                    .reverse()}
            </div>
        </div>
    );
};

export default FriendsPage;
