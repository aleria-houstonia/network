import React, { useContext, useEffect } from "react";
import { postContext } from "../../contexts/PostContext";
import { userInfoContext } from "../../contexts/UserInfoContext";
import PostCard from "../Post/PostCard";
import "./Home.css";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "../SideBar/Sidebar";
import { useHistory } from "react-router";
const Home = (props) => {
    const { getInfo } = useContext(userInfoContext);
    const { getPostPagination, postPageData, loadMore, limit } = useContext(
        postContext
    );
    const { currentUser } = useAuth();
    const history = useHistory();
    useEffect(() => {
        // getInfo(currentUser.email);
        console.log(currentUser);
        getPostPagination(history);
        // postPageData.reverse();
    }, [limit]);
    function loadMoreButton() {
        loadMore();
        // window.scrollTo();
    }
    return (
        <div className="home-page">
            <div
                className="home-container"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                }}
            >
                <div>
                    {postPageData.map((item) => (
                        <div style={{ margin: "30px 40px" }}>
                            <PostCard item={item} history={history} />
                        </div>
                    ))}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "45px",
                                display: "flex",
                                justifyContent: "center",
                                color: "gray",
                            }}
                            onClick={loadMoreButton}
                            className="button signInBtn "
                        >
                            <i class="fas fa-caret-down"></i>
                        </div>
                        <button
                            onClick={() => window.scrollTo(0, 0)}
                            style={{ width: "100px" }}
                        >
                            to top
                        </button>
                    </div>
                </div>
                <div style={{ marginTop: "30px" }}>
                    {/* <Sidebar {...props} /> */}
                </div>
            </div>
        </div>
    );
};

export default Home;
