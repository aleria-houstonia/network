import React from "react";

const Alarm = () => {
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

export default Alarm;
