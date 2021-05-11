import React, { useContext, useState } from "react";
import { userInfoContext } from "../../contexts/UserInfoContext";
import { useAuth } from "../../contexts/AuthContext";
const UserInfoAdd = ({ history }) => {
    const { postUserInfo } = useContext(userInfoContext);
    const { currentUser } = useAuth();
    const [info, setInfo] = useState({
        name: "",
        status: "",
        birthday: "",
        city: "",
        education: "",
        image: "",
        id: currentUser.email,
    });
    function handleValues(e) {
        let newInfo = {
            ...info,
            [e.target.name]: e.target.value,
            id: currentUser.email,
        };
        setInfo(newInfo);
    }
    function handleClick() {
        postUserInfo(info, currentUser.email);
        setInfo({
            name: "",
            status: "",
            birthday: "",
            city: "",
            education: "",
            image: "",
            id: currentUser.email,
        });
        {
            history.push("/userpage");
        }
    }
    return (
        <div
            className="adding-container"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <input
                name="name"
                value={info.name}
                onChange={handleValues}
                type="text"
                placeholder="name"
            />
            <input
                name="status"
                value={info.status}
                onChange={handleValues}
                type="text"
                placeholder="status"
            />
            <input
                name="birthday"
                value={info.birthday}
                onChange={handleValues}
                type="text"
                placeholder="birthday"
            />
            <input
                name="city"
                value={info.city}
                onChange={handleValues}
                type="text"
                placeholder="city"
            />
            <input
                name="education"
                value={info.education}
                onChange={handleValues}
                type="text"
                placeholder="education"
            />
            <input
                name="image"
                value={info.image}
                onChange={handleValues}
                type="text"
                placeholder="image"
            />
            <button onClick={handleClick}>Save</button>
        </div>
    );
};

export default UserInfoAdd;
