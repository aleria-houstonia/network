import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import UserInfoAdd from "./components/UserInfo/UserInfoAdd";
import UserPage from "./components/UserInfo/UserPage";
import UserInfoContextProvider from "./contexts/UserInfoContext";
import UpdateProfile from "./components/AuthThings/UpdateProfile";
import Login from "./components/AuthThings/Login";
import Signup from "./components/AuthThings/Signup";
import ForgotPassword from "./components/AuthThings/ForgotPassword";
import AddPost from "./components/AddPost/AddPost";
import PostContextProvider from "./contexts/PostContext";
import CommentContextProvider from "./contexts/CommentContext";
import Home from "./components/Home/Home";
import SavedPost from "./components/SavedPost/SavedPost";
import UserContextProvider from "./contexts/UsersContext";
import Friends from "./components/Friends/Friends";
import FriendsPage from "./components/Friends/FriendsPage";
import Settings from "./components/Settings/Settings";
import MyFriends from "./components/MyFriends/MyFriends";
import Message from "./components/Message/Message";
import MessageContextProvider from "./contexts/MessageContext";
import Chat from "./components/Message/Chat";
import Gallery from "./components/Gallery/Gallery";
import Forum from "./components/Forum/Forum";
import ChatAdd from "./components/Message/ChatAdd";
import PrivateRoutes from "./PriveteRoutes";

const Routes = () => {
    return (
        <div>
            <UserContextProvider>
                <UserInfoContextProvider>
                    {/* <MessageContextProvider> */}
                    <PostContextProvider>
                        <CommentContextProvider>
                            <MessageContextProvider>
                                <BrowserRouter>
                                    <Header />
                                    <Switch>
                                        <PrivateRoutes
                                            path="/savedPost"
                                            component={SavedPost}
                                        />

                                        <PrivateRoutes
                                            exact
                                            path="/userpage"
                                            component={UserPage}
                                        />
                                        <PrivateRoutes
                                            exact
                                            path="/addinfouser"
                                            component={UserInfoAdd}
                                        />
                                        <PrivateRoutes
                                            exact
                                            path="/addpost"
                                            component={AddPost}
                                        />
                                        <PrivateRoutes
                                            exact
                                            path="/update"
                                            component={UpdateProfile}
                                        />
                                        <Route
                                            exact
                                            path="/login"
                                            component={Login}
                                        />
                                        <Route
                                            exact
                                            path="/sign"
                                            component={Signup}
                                        />
                                        <Route
                                            exact
                                            path="/forgot"
                                            component={ForgotPassword}
                                        />
                                        <PrivateRoutes
                                            exact
                                            path="/"
                                            component={Home}
                                        />
                                        <PrivateRoutes
                                            exact
                                            path="/friends"
                                            component={Friends}
                                        />
                                        <PrivateRoutes
                                            exact
                                            path="/friendspage"
                                            component={FriendsPage}
                                        />
                                        <PrivateRoutes
                                            exact
                                            path="/settings"
                                            component={Settings}
                                        />
                                        <PrivateRoutes
                                            exact
                                            path="/myfriends"
                                            component={MyFriends}
                                        />

                                        <PrivateRoutes
                                            exact
                                            path="/gallery"
                                            component={Gallery}
                                        />
                                        <PrivateRoutes
                                            exact
                                            path="/forum"
                                            component={Forum}
                                        />
                                        <PrivateRoutes
                                            exact
                                            path="/chatAdd"
                                            component={ChatAdd}
                                        />
                                    </Switch>
                                </BrowserRouter>
                            </MessageContextProvider>
                        </CommentContextProvider>
                    </PostContextProvider>
                    {/* </MessageContextProvider> */}
                </UserInfoContextProvider>
            </UserContextProvider>
        </div>
    );
};

export default Routes;
