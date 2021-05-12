import { IconButton } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { userInfoContext } from "../../contexts/UserInfoContext";
import { userContext } from "../../contexts/UsersContext";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import "./MyFriends.css";
const MyFriends = () => {
    const { getFriendsInfo, getInfo } = useContext(userInfoContext);
    const { getFriend, friend, resUsers, getUsersRes, deleteFriend } =
        useContext(userContext);
    const history = useHistory();
    useEffect(() => {
        getFriend();
        getUsersRes(history);
    }, []);
    function getFriendsPage(e) {
        getFriendsInfo(e);
        getInfo(e);
        history.push("/friendspage");
    }
    // console.log(friend?.posts.length); //длина массива
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
            {" "}
            <div style={{ fontSize: "30px", margin: "30px 0" }}>
                {" "}
                My friends
            </div>
            <div className="main-container">
                {friend && friend?.posts ? (
                    <>
                        {" "}
                        {friend.posts.map((item) => (
                            <>
                                <div className="one-user" key={item.item.email}>
                                    <img src="https://brighterwriting.com/wp-content/uploads/icon-user-default.png" />
                                    <p
                                        onClick={() =>
                                            getFriendsPage(item.item.email)
                                        }
                                    >
                                        {item.item.name}
                                    </p>

                                    <div>
                                        <IconButton
                                            onClick={() => {
                                                deleteFriend(item.item.id);
                                            }}
                                            style={{ fontSize: "19px" }}
                                        >
                                            <i class="fas fa-user-minus"></i>
                                        </IconButton>
                                    </div>
                                    <div>
                                        <IconButton>
                                            <EmailOutlinedIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </>
                        ))}
                    </>
                ) : (
                    <div style={{ fontSize: "30px", margin: "30px 0" }}>
                        no friends
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyFriends;
