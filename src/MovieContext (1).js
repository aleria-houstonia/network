// --------- All Imports -------------
import React, { useReducer } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

//  --------Here we created our movieContext ----------------
export const movieContext = React.createContext();

// --------States and functions that need to be exported-----
const INIT_STATE = {
    moviesData: [],
    movie: [],
    popular: [],
    actionMovies: [],
    cartoonMovies: [],
    cUser: {},
    watchedMovies: [],
};
// -----------Reducer and Switch cases go here -------------
const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_MOVIES":
            return { ...state, moviesData: action.payload };
        case "GET_MOVIE_BY_ID":
            return { ...state, movie: action.payload };
        case "GET_POPULAR":
            return { ...state, popular: action.payload };
        case "GET_ACTION":
            return { ...state, actionMovies: action.payload };
        case "GET_CARTOON":
            return { ...state, cartoonMovies: action.payload };
        case "GET_USER_BY_ID":
            return { ...state, cUser: action.payload };
        case "GET_WATCHED":
            return { ...state, watchedMovies: action.payload };
        default:
            return state;
    }
};

// ------------- Main Context Provider is here--------------
const MoviesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    const { currentUser } = useAuth();
    // --------------Functions go here ---------------------
    // ======== GET ALL MOVIES ------------------
    async function getMovies() {
        let movieCollection = db.collection("movies");
        let arr = [];
        await movieCollection.get().then((snapshot) => {
            snapshot.docs.map((item) => {
                return arr.push(item.data());
            });
            dispatch({
                type: "GET_MOVIES",
                payload: arr,
            });
        });
    }
    async function getPopularMovies() {
        let movieCollection = db.collection("movies");
        let popular = movieCollection.where("type", "==", "popular");
        let arr = [];
        await popular.get().then((snapshot) => {
            snapshot.docs.map((item) => {
                return arr.push(item.data());
            });
            dispatch({
                type: "GET_POPULAR",
                payload: arr,
            });
        });
    }
    async function getActionMovies() {
        let movieCollection = db.collection("movies");
        let action = movieCollection.where("maincategory", "==", "Action");
        let arr = [];
        await action.get().then((snapshot) => {
            snapshot.docs.map((item) => {
                return arr.push(item.data());
            });
            dispatch({
                type: "GET_ACTION",
                payload: arr,
            });
        });
    }
    async function getCartoonMovies() {
        let movieCollection = db.collection("movies");
        let cartoon = movieCollection.where("maincategory", "==", "Cartoon");
        let arr = [];
        await cartoon.get().then((snapshot) => {
            snapshot.docs.map((item) => {
                return arr.push(item.data());
            });
            dispatch({
                type: "GET_CARTOON",
                payload: arr,
            });
        });
    }
    // --------------- Get Certain Movie by ID -------------
    async function getMovieById(id) {
        let movieCollection = db.collection("movies");
        let arr2 = [];
        let data = movieCollection.doc(id);
        await data.get().then((doc) => {
            arr2.push(doc.data());
        });
        dispatch({
            type: "GET_MOVIE_BY_ID",
            payload: arr2,
        });
    }
    //-------------Delete Edit ADD Admin Page---------------
    async function deleteMovie(id) {
        let movieCollection = db.collection("movies");
        await movieCollection.doc(id).delete();

        getMovies();
    }
    async function updateMovie(id, obj) {
        let movieCollection = db.collection("movies");
        await movieCollection.doc(id).update(obj);
        getMovies();
    }
    async function addMovie(product) {
        let movieCollection = db.collection("movies");
        await movieCollection.add(product).then((docRef) => {
            movieCollection.doc(docRef.id).update({
                id: docRef.id,
            });
        });
        getMovies();
    }

    async function getUserInfo(uid) {
        let users = db.collection("users");
        let user = {};
        let data = users.doc(uid);
        await data.get().then((doc) => {
            user = { ...doc.data() };
        });
        dispatch({
            type: "GET_USER_BY_ID",
            payload: user,
        });
    }

    async function sendMovieHistory(product) {
        let watch = db.collection("watchhistory");
        await watch.add(product).then((docRef) => {
            watch.doc(docRef.id).update({
                id: docRef.id,
                continueWatching: true,
            });
        });
    }
    async function getMovieHistory(id) {
        let watch = db.collection("watchhistory");
        let watched = watch.where("id", "==", id);
        let arr = [];
        await watched.get().then((snapshot) => {
            snapshot.docs.map((item) => {
                return arr.push(item.data());
            });
            dispatch({
                type: "GET_WATCHED",
                payload: arr,
            });
        });
    }
    // Values and functions to export go here --------------
    const value = {
        moviesData: state.moviesData,
        movie: state.movie,
        popular: state.popular,
        actionMovies: state.actionMovies,
        cartoonMovies: state.cartoonMovies,
        cUser: state.cUser,
        watchedMovies: state.watchedMovies,
        getMovieHistory,
        sendMovieHistory,
        getUserInfo,
        getMovieById,
        getPopularMovies,
        getMovies,
        getActionMovies,
        getCartoonMovies,
        addMovie,
        updateMovie,
        deleteMovie,
    };
    return (
        <movieContext.Provider value={value}>{children}</movieContext.Provider>
    );
};

export default MoviesContextProvider;
