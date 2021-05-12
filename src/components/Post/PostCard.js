import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Collapse from "@material-ui/core/Collapse";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { postContext } from "../../contexts/PostContext";
import Comments from "../Comments/Comments";
import clsx from "clsx";
import DeleteIcon from "@material-ui/icons/Delete";
import { userInfoContext } from "../../contexts/UserInfoContext";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { useHistory } from "react-router";
import { userContext } from "../../contexts/UsersContext";
import { useAuth } from "../../contexts/AuthContext";
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 450,
        minWidth: 300,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
}));
const PostCard = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const {
        getPostPagination,
        deletePost,
        getPost,
        addProductToSave,
        checkProductInCart,
        deleteCartProducts,
        editPost,
        getAlarm,
    } = useContext(postContext);
    const { userInfoData } = useContext(userInfoContext);
    const { currentUser } = useAuth();
    useEffect(() => {
        getPost();
        getPostPagination(history);
    }, []);
    function funcLike(post, user) {
        let newLike = user;
        let newPost = { ...post };

        let filteredLikes = post.like.filter((elem) => elem === user);
        if (filteredLikes.length > 0 && filteredLikes.includes(user)) {
            filteredLikes = post.like.filter((elem) => elem !== user);

            newPost.like = filteredLikes;
            editPost(post.id, newPost);
        } else {
            newPost.like.push(newLike);
            editPost(post.id, newPost);
            getAlarm(post.description, user);
        }

        // setExpanded2(!expanded2);
    }

    // console.log(likes?.posts[likes.posts.length - 1] );
    // const [like, setLike] = useState();
    // setLike(likes.posts?.lengt);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // const [expanded2, setExpanded2] = useState(false);
    function handleView(post, user) {
        let newView = user;
        let newPost = { ...post };

        let filteredLikes = post.view.filter((elem) => elem === user);
        if (filteredLikes.length > 0) {
            filteredLikes = post.view.filter((elem) => elem !== user);
        } else {
            newPost.view.push(newView);
            editPost(post.id, newPost);
        }
    }

    return (
        <div>
            <Card
                className={classes.root}
                onClick={() => handleView(props.item, currentUser.email)}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                            style={{ backgroundSize: "cover" }}
                        >
                            <img src={userInfoData.image} />
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.item.name}
                    subheader={props.item.date}
                />
                <CardMedia
                    className={classes.media}
                    image={props.item.image}
                    title="Paella dish"
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {props.item.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="add to favorites"
                        onClick={() => funcLike(props.item, currentUser.email)}
                    >
                        <FavoriteIcon />
                        {props.item.like.length}
                    </IconButton>
                    <IconButton
                        aria-label="comment"
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                    >
                        <i class="fas fa-comments"></i>
                    </IconButton>
                    {currentUser.uid === props.item.uid ? (
                        <IconButton
                            onClick={() => {
                                deletePost(props.item.id, props.history);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    ) : null}
                    <IconButton>
                        <BookmarkIcon
                            color={
                                checkProductInCart(props.item.id)
                                    ? "primary"
                                    : "outlined"
                            }
                            onClick={() => addProductToSave(props.item)}
                            onDoubleClick={() =>
                                deleteCartProducts(props.item.id)
                            }
                        />
                    </IconButton>

                    <IconButton>
                        <i class="fas fa-eye"></i>
                        {props.item.view.length}
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <div style={{ borderTop: "1px solid lightgray" }}>
                        <Comments name={props.item.description} />
                    </div>
                </Collapse>
            </Card>
        </div>
    );
};

export default PostCard;
