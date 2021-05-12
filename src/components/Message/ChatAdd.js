import React, { useContext, useEffect, useState } from "react";
import { messageContext } from "../../contexts/MessageContext";

const ChatAdd = (props) => {
    const [textMessage, setTextMessage] = useState("");
    const { getId } = useContext(messageContext);

    const sendMessage = () => {
        let chat = textMessage;
        getId(props.id, chat, props.current, props.toUser);
    };
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <textarea
                name="message"
                onChange={(e) => setTextMessage(e.target.value)}
                placeholder=" написать сообщение"
                type="text"
                style={{
                    margin: "10px 0",
                    width: "300px",
                    height: "50px",
                    textAlign: "center",
                    fontSize: "15px",
                }}
            ></textarea>
            <button style={{ fontSize: "12px" }} onClick={sendMessage}>
                Send
            </button>
        </div>
    );
};

export default ChatAdd;
