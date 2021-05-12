import React from "react";
import Chat from "./Chat";
import ChatAdd from "./ChatAdd";

const Message = (props) => {
    return (
        <div>
            <Chat />
            <ChatAdd id={props.id} />
        </div>
    );
};

export default Message;
