import {
    Avatar,
    Button,
    Container,
    Grid,
    TextareaAutosize,
    TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { firestore } from "../../helpers/base";
import Header from "../Header/Header";
import SendIcon from "@material-ui/icons/Send";
import "./Forum.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const Forum = () => {
    const { currentUser } = useAuth();
    const [value, setValue] = useState("");
    const [messages, loading] = useCollectionData(
        firestore.collection("messages").orderBy("createdAt")
    );

    const sendMessage = async () => {
        firestore.collection("messages").add({
            uid: currentUser.uid,
            displayName: currentUser.email,
            // photoURL: currentUser.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            id: Date.now(),
        });
        setValue("");
    };

    const deleteMessage = async (messageId) => {
        const res = await firestore
            .collection("messages")
            .where("id", "==", messageId);
        res.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });
        console.log(res);
    };

    console.log(firestore.collection("messages"));
    return (
        <>
            <div>asdasdasd</div>
            {/* <Header /> */}
            <div className="chat__container">
                <Container>
                    <Grid
                        container
                        justify={"center"}
                        style={{ height: window.innerHeight - 50 }}
                    >
                        <div
                            style={{
                                width: "80%",
                                height: "60vh",
                                border: "1px solid gray",
                                overflowY: "auto",
                                background: "rgba(255, 255, 255, 0.1)",
                            }}
                        >
                            {messages &&
                                messages.map((item) => (
                                    <div
                                        style={{
                                            margin: 10,
                                            // border: currentUser.uid === item.uid ? '2px solid green' : '2px dashed red',
                                            background:
                                                currentUser.uid === item.uid
                                                    ? "rgba(20, 28, 199, 0.5)"
                                                    : "rgba(40, 3, 75, 0.5)",
                                            borderRadius: 10,
                                            marginLeft:
                                                currentUser.uid === item.uid
                                                    ? "auto"
                                                    : "10px",
                                            width: "fit-content",
                                            minWidth: 150,
                                            maxWidth: "60%",
                                        }}
                                    >
                                        <Grid container>
                                            <Avatar src={item.photoURL} />
                                            <div>{item.displayName}</div>
                                            <Button
                                                onClick={() =>
                                                    deleteMessage(item.id)
                                                }
                                            >
                                                <DeleteForeverIcon />
                                            </Button>
                                        </Grid>
                                        <div
                                            style={{
                                                overflowWrap: "break-word",
                                            }}
                                        >
                                            {item.text}
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <Grid
                            container
                            direction={"column"}
                            alignItems={"flex-end"}
                            style={{ width: "80%" }}
                        >
                            <TextField
                                placeholder="Введите сообщение"
                                onChange={(e) => setValue(e.target.value)}
                                className="chat__input-field"
                                variant={"outlined"}
                                fullWidth
                                rowsMax={2}
                                value={value}
                            />
                            <Button
                                onClick={sendMessage}
                                className="chat__send-button"
                            >
                                <SendIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
};

export default Forum;
