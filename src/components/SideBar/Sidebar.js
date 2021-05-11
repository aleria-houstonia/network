import React, { useContext, useState } from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { postContext } from "../../contexts/PostContext";
import { useAuth } from "../../contexts/AuthContext";
import { userInfoContext } from "../../contexts/UserInfoContext";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

const Sidebar = ({ history }) => {
    const classes = useStyles();
    const { getPostPagination } = useContext(postContext);
    const { currentUser } = useAuth();
    const { userInfoData } = useContext(userInfoContext);
    const [memory, setMemory] = useState(getMemory());

    function getMemory() {
        const search = new URLSearchParams(history.location.search);
        console.log(search);
        return search.get("uid");
    }

    console.log(currentUser);

    const handleChangeMemory = async (event) => {
        if (event.target.value === "All") {
            await history.push(
                `/post${history.location.pathname.replace("uid")}`
            );

            getPostPagination(history);
        }
        const search = new URLSearchParams(history.location.search);
        console.log("history location", search);

        await search.set("uid", event.target.value);

        await history.push(
            `/post${history.location.pathname}?${search.toString()}`
        );
        getPostPagination(history);
        setMemory(event.target.value);
    };

    return (
        <Grid>
            <Paper className={classes.paper}>
                <FormControl component="fieldset">
                    <FormLabel component="legend"></FormLabel>
                    <RadioGroup
                        value={memory}
                        onChange={handleChangeMemory}
                        aria-label="memory"
                        name="memory1"
                    >
                        <FormControlLabel
                            value={currentUser.uid}
                            control={<Radio />}
                            label="my"
                        />
                        <FormControlLabel
                            value="all"
                            control={<Radio />}
                            label="All"
                        />
                    </RadioGroup>
                </FormControl>
                {/*
                <Grid>
                    <Slider
                        value={sliderValue}
                        min={500}
                        max={20000}
                        onChange={handleSliderValue}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                    />
                </Grid> */}
            </Paper>
        </Grid>
    );
};

export default Sidebar;
