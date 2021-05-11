import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";

import {
    FiHome,
    FiLogOut,
    FiArrowLeftCircle,
    FiArrowRightCircle,
} from "react-icons/fi";

import { BiCog } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";
import { userInfoContext } from "../../contexts/UserInfoContext";
import { userContext } from "../../contexts/UsersContext";

const Header = () => {
    const [menuCollapse, setMenuCollapse] = useState(false);
    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const { userInfoData, getInfo } = useContext(userInfoContext);
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    useEffect(() => {
        // getInfo(currentUser.email);
        console.log(currentUser);
    }, []);

    const [searchValue, setSearchValue] = useState(getSearchValue());
    const { getUsersRes } = useContext(userContext);

    const handleValue = (e) => {
        const search = new URLSearchParams(history.location.search);
        search.set("q", e.target.value);
        history.push(`${history.location.pathname}?${search.toString()}`);
        setSearchValue(e.target.value);
        getUsersRes(history);
    };

    function getSearchValue() {
        const search = new URLSearchParams(history.location.search);
        return search.get("q");
    }

    async function handleLogout() {
        setError("");

        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
        }
    }

    return (
        <>
            {" "}
            <div className="header">
                <div className="header-main">
                    <div className="header-left">
                        <p>Network</p>
                    </div>
                    <div className="header-center">
                        <div className="header-center_logo">
                            <i class="fas fa-search"></i>
                        </div>
                        <input
                            type="text"
                            placeholder="search"
                            onChange={handleValue}
                            value={searchValue}
                        />
                    </div>
                    <div className="header-right">
                        <div className="header-right_nav-logos">
                            <div>
                                <Link to="/savedPost">
                                    <FavoriteIcon />
                                </Link>
                            </div>
                            <div>
                                <Link to="/forgot">
                                    <i class="fas fa-bell"></i>
                                </Link>
                            </div>
                            <div>
                                <Link to="/forum">
                                    <i class="fas fa-comment-dots"></i>
                                </Link>
                            </div>
                            <div>
                                <Link to="/friends">
                                    <i class="fas fa-user-plus"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="header">
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="logotext">
                            {currentUser &&
                            currentUser.email == userInfoData.email ? (
                                <p>{menuCollapse ? null : userInfoData.name}</p>
                            ) : null}
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {menuCollapse ? (
                                <FiArrowRightCircle />
                            ) : (
                                <FiArrowLeftCircle />
                            )}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem
                                onClick={() => history.push("/userpage")}
                                icon={<i class="far fa-user"></i>}
                            >
                                My page
                            </MenuItem>
                            <MenuItem
                                active={true}
                                icon={<FiHome />}
                                onClick={() => history.push("/")}
                            >
                                Home
                            </MenuItem>
                            <MenuItem
                                icon={<i class="far fa-comment"></i>}
                                onClick={() => history.push("/message")}
                            >
                                Messages
                            </MenuItem>
                            <MenuItem
                                icon={<PeopleOutlineIcon />}
                                onClick={() => history.push("/myfriends")}
                            >
                                Friends
                            </MenuItem>

                            <MenuItem
                                onClick={() => history.push("/addpost")}
                                icon={<i class="far fa-lightbulb"></i>}
                            >
                                Add
                            </MenuItem>
                            <MenuItem
                                icon={<i class="far fa-image"></i>}
                                onClick={() => history.push("/gallery")}
                            >
                                Photo
                            </MenuItem>
                            <MenuItem
                                icon={<BiCog />}
                                onClick={() => history.push("/settings")}
                            >
                                Settings
                            </MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem
                                icon={<FiLogOut />}
                                onClick={handleLogout}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>
    );
};

export default Header;
