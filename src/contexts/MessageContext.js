// import React, { useReducer, useState } from "react";
// import { firestore } from "../helpers/base";
// import firebase from "firebase";
// export const messageContext = React.createContext();

// const INIT_STATE = {};

// const reducer = (state = INIT_STATE, action) => {
//     switch (action.type) {
//         case "...":
//         default:
//             return state;
//     }
// };
// const MessageContextProvider = ({ children }) => {
//     const [messagesa, setMessagesa] = useState();
//     const [state, dispatch] = useReducer(reducer, INIT_STATE);
//     const getMessages = async () => {
//         const data = await firestore.collection("messagesa").get();
//         setMessagesa(data.map((doc) => doc.data()));
//     };
//     getMessages();
//     return (
//         <messageContext.Provider value={{}}>{children}</messageContext.Provider>
//     );
// };
// export default MessageContextProvider;
