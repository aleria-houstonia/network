import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { userContext } from "../../contexts/UsersContext";
import "./Friends.css";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import { IconButton, useScrollTrigger } from "@material-ui/core";
// import FriendsPage from "./FriendsPage";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { userInfoContext } from "../../contexts/UserInfoContext";
const Friends = ({ history }) => {
    const { resUsers, getUsersRes, addFriend } = useContext(userContext);
    const { currentUser } = useAuth();
    const [user, setUser] = useState(false);
    const { getFriendsInfo, getInfo } = useContext(userInfoContext);
    const [id, setId] = useState();
    useEffect(() => {
        getUsersRes(history);
    }, []);
    function getFriendsPage(e) {
        getFriendsInfo(e);
        getInfo(e);
        history.push("/friendspage");
    }
    function haveUser(e, item) {
        addFriend(item);
        setId(e.target.parentNode.parentNode.id);
        setUser(true);
    }
    return (
        <div
            className="friends-cont"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <div className="main-container">
                {resUsers.map((item) => (
                    <>
                        {currentUser.email == item.email ? null : (
                            <div
                                className="one-user"
                                //
                                key={item.email}
                            >
                                <img src="https://brighterwriting.com/wp-content/uploads/icon-user-default.png" />
                                <p onClick={() => getFriendsPage(item.email)}>
                                    {item.name}
                                </p>
                                <div>
                                    <IconButton>
                                        <EmailOutlinedIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={(e) => haveUser(e, item)}
                                        id={item.email}
                                    >
                                        {user && item.email == id ? (
                                            <i class="fas fa-user-check"></i>
                                        ) : (
                                            <AddOutlinedIcon />
                                        )}
                                    </IconButton>
                                </div>
                            </div>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};

export default Friends;
