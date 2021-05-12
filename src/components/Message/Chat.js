import React, { useContext, useEffect } from "react";
import { messageContext } from "../../contexts/MessageContext";

const Chat = () => {
    const { fetchMessage, chatid } = useContext(messageContext);
    useEffect(() => {
        fetchMessage();
    }, []);

    return (
        <div>
            <div className="chat-container">
                <div className="message">
                    <div className="name-message">{chatid.id}</div>
                    {chatid.arr ? (
                        <>
                            {chatid.arr.map((item) => (
                                <div className="text-message">{item}</div>
                            ))}
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Chat;
